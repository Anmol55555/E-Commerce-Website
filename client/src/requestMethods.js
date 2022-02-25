// Created a shortcut for using axios such to not import axios and write BASE_URL("http://localhost:5000/api/") everytime for easy use.

import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
// TOKEN : getting jwt token from local storage location


// publicRequest = where anybody can request those actions used by this, (whether logged in or not) 
// => Hence no need to verify the user login situation using JWT Token.
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// userRequest = where user must have to be logged in to perform those actions 
// Hence verifying the user log in situation using JWT Token.
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
});

