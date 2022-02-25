//page to get post request with user redux reducers for LOGIN page

import { loginStart, loginSuccess, loginFailure } from './userRedux.js';
import { publicRequest } from '../requestMethods.js';                       // for using axios

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/auth/login', user)    // For authentication, user contains username and password entered y the user and hence it is passed as a body in post request
        dispatch(loginSuccess(res.data));                            // passing res.data as action.payload to loginSuccess in userRedux.js
    }
    catch (err) {
        dispatch(loginFailure());
    }
}