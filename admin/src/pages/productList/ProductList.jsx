// To show product List page listing all the products details

import './productList.css';
import { DataGrid } from '@material-ui/data-grid';         // Impoted from material-ui/data-grid to use Sortable Data Table to display users
import { DeleteOutline } from '@material-ui/icons';
// import { productRows } from '../../dummyData';           // Now, no dummy data required
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../redux/apiCalls.js';

const ProductList = () => {

    // const [data, setData] = useState(productRows);           // Now no dummy data required
    const dispatch = useDispatch();
    const products = useSelector((state) => {return state.product.products});

    useEffect(() => {   
        getProducts(dispatch);
    }, [dispatch, products]);                         

    const handleDelete = (id) => {
        // setData(data.filter((item) => {return item.id != id}));          // For dummy data
        // event.preventDefault();
        console.log('on delete');
        deleteProduct(id, dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
          field: 'product',
          headerName: 'Product',
          width: 220,
          renderCell: (params) => {
              return (
                  <div className="productListItem">
                      <img src={params.row.img} className="productListImg"/>
                      {params.row.title}
                  </div>
              );
          }
        },
        {
          field: 'inStock',
          headerName: 'Stock',
          width: 200,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline 
                            className="productListDelete" 
                            onClick={() => handleDelete(params.row._id)}/>
                    </>
                    
                )
            }
          },
      ];

    return (
        <div className="productList">
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8 }
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default ProductList;