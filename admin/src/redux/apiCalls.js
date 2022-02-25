//page to get post request with user redux reducers for LOGIN page

import { loginStart, loginSuccess, loginFailure } from './userRedux.js';                        // For Login
import { publicRequest, userRequest } from '../requestMethods.js';                       // for using axios
import { getProductStart, 
         getProductSuccess, 
         getProductFailure,
         deleteProductStart, 
         deleteProductSuccess, 
         deleteProductFailure,
         updateProductStart, 
         updateProductSuccess, 
         updateProductFailure,
         addProductStart, 
         addProductSuccess, 
         addProductFailure,} from './productRedux.js';      // importing reducers For Product List
import { CollectionsBookmarkOutlined } from '@material-ui/icons';

// For Login Process
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    console.log('start');
    try {
        const res = await publicRequest.post('/auth/login', user)    // For authentication, user contains username and password entered y the user and hence it is passed as a body in post request
        dispatch(loginSuccess(res.data));                            // passing res.data as action.payload to loginSuccess in userRedux.js
        console.log("success");
    }
    catch (err) {
        dispatch(loginFailure());
        console.log('failure');
    }

}


// For GETTING product list in admin side
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    console.log('start');
    try {
        const res = await publicRequest.get('/products')    
        dispatch(getProductSuccess(res.data));                            // passing res.data as action.payload to getProductSuccess in productRedux.js
        console.log("success");
    }
    catch (err) {
        dispatch(getProductFailure());
        console.log('failure');
    }

}


// For DELETING a particular product in the product list in admin side   // Will delete the product from Database also
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    console.log('start delete');
    try {
        const res = await userRequest.delete(`/products/${id}`);    
        dispatch(deleteProductSuccess(id));                            // passing res.data as action.payload to getProductSuccess in productRedux.js
        console.log("success delete");
    }
    catch (err) {
        dispatch(deleteProductFailure());
        console.log('failure delete');
    }

}

// UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    console.log('start update');
    try {
        // update   
        dispatch(updateProductSuccess({id, product}));                            // passing res.data as action.payload to getProductSuccess in productRedux.js
        console.log("success update");
    }
    catch (err) {
        dispatch(updateProductFailure());
        console.log('failure update');
    }

}

// ADD PRODUCT
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    console.log('start added');
    try {
        const res = await userRequest.post(`/products`, product);    
        dispatch(addProductSuccess(res.data));                            // passing res.data as action.payload to getProductSuccess in productRedux.js
        console.log("success added");
    }
    catch (err) {
        dispatch(addProductFailure());
        console.log('failure added');
    }

}