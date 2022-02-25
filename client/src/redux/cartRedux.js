    //                       App component
    //         __________________|__________________                 
    //         |                                    |
    // Component 1                        		Component 2
// •  The action to change/update is passed to Reducers : (Handle Actions, changes State )
//     which gets passed to 	               Store :    (Stores the current updated state)
//     which then passed to all the components where the change should occur
//    Hence Flow =>  	Component 2	------------------------------>       Reducer       --------------------->     Store    ------------------------->  Component 1, other Components, etc
// 					                     Action to Change/Update      Handle Action                        Store Update State 			                Action(Changes)  Reflected


import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({                         // cartRedux file name can be renamed as cartSlice
    name: "cart",
    initialState: {                         // inital State of the Cart
        products: [],           
        quantity: 0,                        // intital quantity when nothing is added => quantity = 0
        total: 0,                            // Total Price initially = 0
    },
    reducers: {                             // We are able to update/mutaute this prevState using redux Toolkit, if it was pure redux, we are not able to do so.
        addProduct: (prevState, action) => {            // The updation on the cart page, when we put Action = ADD TO CART
            prevState.quantity += 1;
            prevState.products.push(action.payload);        // getting payload = (...product, quantity, color, size), i.e. selected product title,id,desc,img, selected quantity, color, size
            prevState.total += (action.payload.price*action.payload.quantity);          // Here quantity is the quantity passed as a payload from product page
        }
    }
});

export const { addProduct } = cartSlice.actions;            // Mentioning reducers
export default cartSlice.reducer;
