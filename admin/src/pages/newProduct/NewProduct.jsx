import { useState } from 'react';
import './newProduct.css';
// Using Firebase to upload new product image from system (laptop/mobile) and get the response from Firebase as image URL
// This image URL provide by Firebase will be used in MongoDB database to save the new product
import { 
    getStorage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
} from "firebase/storage";       
import app from '../../firebase.js';

import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const NewProduct = () => {

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
                    const newProduct = { ...inputs, img: downloadURL, categories: cat};
                    addProduct(newProduct, dispatch);
                });
            }
        );

    };

    // console.log(inputs);
    // console.log(cat);
    console.log(file);
    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={(event) => setFile(event.target.files[0])}/>
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Nike Shoes" onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="text" name="desc" placeholder="description..." onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input type="number" name="price" placeholder="100" onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input type="text" placeholder="jeans,skirt" onChange={handleCat}/>
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                
                <button onClick={handleClick} className="addProductButton">Create</button>
            </form>
        </div>
    );
}

export default NewProduct;  