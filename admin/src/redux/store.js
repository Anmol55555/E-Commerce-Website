import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userRedux.js';
import productReducer from './productRedux.js';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';           // To persist(keep) the change in the different reduccers, such the even after refresh, the items in the cart saved as they are selected before,  and   ,  the user remained logged in even after refresh 
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

// rootReducer = cobination of all the reducers such that to make all of the reducer persist
const rootReducer = combineReducers({ user: userReducer, product: productReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  configureStore({
    reducer: persistedReducer,                      // Here we will mention all the Reducer we have made to store the current state

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);


// used in for login page in admin

// Initial Code When No persist is enabled :- 

    // import { configureStore } from '@reduxjs/toolkit';
    // import cartReducer from './cartRedux.js';
    // import userReducer from './userRedux.js';

    // export default configureStore({
    //     reducer: {                          // Here we will mention all the Reducer we have made to store the current state
    //         cart: cartReducer,
    //         user: userReducer,
    //     }
    // });