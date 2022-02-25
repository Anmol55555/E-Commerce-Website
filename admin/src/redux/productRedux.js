import { createSlice } from '@reduxjs/toolkit';


// Used in apiCall.js
const productSlice = createSlice({
    name: "product",
    initialState: {                         // inital State of the user
        products: [],
        isFetching: false,                  // To show loading statement while data is fetching
        error: false,
    },
    reducers: {                             // We are able to update/mutaute this prevState using redux Toolkit, if it was pure redux, we are not able to do so.
                                            // Defining Reducers
        // Get All
        getProductStart: (prevState) => {
            prevState.isFetching = true;
            prevState.error = false;
        },
        getProductSuccess: (prevState, action) => {             
            prevState.isFetcing = false;
            prevState.error = false;
            prevState.products = action.payload;
        },
        getProductFailure: (prevState) => {
            prevState.isFetching = false;
            prevState.error = true;
        },


        // DELETE a particular product from product list as well as store
        deleteProductStart: (prevState) => {
            prevState.isFetching = true;
            prevState.error = false;
        },
        deleteProductSuccess: (prevState, action) => {          // deleting using splice() JS method from the store
            // splice(idx, no. of items to be deleted)  => In an array, we put 1st argument = index of the element from where we want to delete, 2nd argument = the no. of element after that we want to delete
            prevState.isFetcing = false;
            prevState.error = false;
            prevState.products.splice(
                prevState.products.findIndex((item) => item._id ===  action.payload.id),
                1
            ); 
        },
        deleteProductFailure: (prevState) => {
            prevState.isFetching = false;
            prevState.error = true;
        },


        // UPDATE
        updateProductStart: (prevState) => {
            prevState.isFetching = true;
            prevState.error = false;
        },
        updateProductSuccess: (prevState, action) => {             
            prevState.isFetcing = false;
            prevState.error = false;
            prevState.products[
                prevState.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;
        },
        updateProductFailure: (prevState) => {
            prevState.isFetching = false;
            prevState.error = true;
        },


        // ADD NEW PRODUCT
        addProductStart: (prevState) => {
            prevState.isFetching = true;
            prevState.error = false;
        },
        addProductSuccess: (prevState, action) => {             
            prevState.isFetcing = false;
            prevState.error = false;
            prevState.products.push(action.payload); 
        },
        addProductFailure: (prevState) => {
            prevState.isFetching = false;
            prevState.error = true;
        },
        
    }
});

// Mentioning user Reducers
export const { 
                getProductStart, 
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
                addProductFailure, } = productSlice.actions;        
export default productSlice.reducer;