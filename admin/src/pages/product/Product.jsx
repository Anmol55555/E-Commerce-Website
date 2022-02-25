import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import Chart from '../../components/chart/Chart.jsx';
import { productData } from '../../dummyData.js';
import { Publish } from '@material-ui/icons';
import './product.css';
import { userRequest } from '../../requestMethods.js';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/apiCalls.js';
// Using Firebase to upload new product image from system (laptop/mobile) and get the response from Firebase as image URL
// This image URL provide by Firebase will be used in MongoDB database to save the new product
import { 
    getStorage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
} from "firebase/storage";       
import app from '../../firebase.js';

const Product = () => {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];          // Getting product Id from the current URL path
    const [pStats, setPStats] = useState([]);                     // pStats = product Stats for displaying charts

    // Getting PRoduct Details from redux store
    const product = useSelector((state) => 
        state.product.products.find((product) => product._id === productId)
    );

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) => 
                    setPStats((prev) => [
                        ...prev,
                        { name : MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            }
            catch (err) {
                console.log(err);
            }
        }
        getStats();
    }, [productId, MONTHS]);

    // To UPDATE PRODUCT INFO
    const [inputs, setInputs] = useState({});           // For other data like title, desc, price, inStock, etc.
    const [file, setFile] = useState(null);             // For image file
    const [cat, setCat] = useState([]);                 // For categories array
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setInputs((prev) => {
            return {...prev, [event.target.name]: event.target.value};
        })
    };

    const handleCat = (event) => {
        setCat(event.target.value.split(","));
    };

    const handleClick = (event) => {
        event.preventDefault();
        const fileName =  new Date().getTime() + file.name;     // Date() => to get unique file name for image file
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        // Below Code copied from firebase docs
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {         // downloadURL = is the final url of the uplaoded image which will be saved in db
                    // const updatedProduct = { ...inputs, img: downloadURL, categories: cat};      
                    // updateProduct(product._id, updatedProduct, dispatch);
                    // console.log(product._id, updatedProduct);
                });
                // NOT UPDATING HERE, DONT KNOW WHY
            }
        );

    };


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link> 
            </div>

            <div className="productTop">
                {/* Chart */}
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" grid={false}/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img 
                            src={product.img} 
                            alt="" 
                            className="productInfoImg" 
                        />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                        <span className="productInfoKey">sales:</span>
                        <span className="productInfoValue">5263</span>
                        </div>  
                        <div className="productInfoItem">
                        <span className="productInfoKey">In stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                            <input type="text" name="title" placeholder={product.title} onChange={handleChange}/>
                        <label>Product Description</label>
                            <input type="text" name="desc" placeholder={product.desc} onChange={handleChange}/>
                        <label>Product Price</label>
                            <input type="text" name="price" placeholder={product.price} onChange={handleChange}/>
                        <label>Product Categories</label>
                            <input type="text" name="categories" placeholder={product.categories} onChange={handleCat}/>
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img 
                                src={product.img}
                                className="productUploadImg"    
                            />
                            {/* To upload file, for="file" with publish icon, and hide the actual input button */}
                            <label for="file"><Publish /></label>
                            <input type="file" id="file" 
                                style={{display: "none"}} onChange={(event) => setFile(event.target.files[0])}
                            />
                        </div>
                        <button onClick={handleClick}  className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Product;