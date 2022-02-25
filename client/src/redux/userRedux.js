    //                       App component
    //         __________________|__________________                 
    //         |                                    |
    // Component 1                        		Component 2
// •  The action to change/update is passed to Reducers : (Handle Actions, changes State )
//     which gets passed to 	               Store :    (Stores the current updated state)
//     which then passed to all the components where the change should occur
//    Hence Flow =>  	Component 2	------------------------------>       Reducer       --------------------->     Store    ------------------------->  Component 1, other Components, etc
// 					                     Action to Change/Update      Handle Action                        Store Update State 			                Action(Changes)  Reflected


// Used in apiCall.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {                         // inital State of the user
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {                             // We are able to update/mutaute this prevState using redux Toolkit, if it was pure redux, we are not able to do so.
                                            // Defining Reducers
        loginStart: (prevState ) => {
            prevState.isFetching = true;
        },
        loginSuccess: (prevState, action) => {          // we will try to login using our username and password , then if it is correct then 
            prevState.isFetching = false;
            prevState.currentUser = action.payload;
            prevState.error = false;
        },
        loginFailure: (prevState ) => {                // If the username or password for login is false, then => 
            prevState.isFetching = false;
            prevState.error = true;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;        // Mentioning user Reducers
export default userSlice.reducer;
