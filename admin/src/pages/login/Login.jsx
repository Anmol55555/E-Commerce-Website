import './login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls.js';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (event) => {
        event.preventDefault();

        // Handling Login using Redux
        login(dispatch, { username, password });
    }

    return (
        <div className="login">
            <input 
                type="text" 
                placeholder="username" 
                onChange={(event) => setUsername(event.target.value)}
                className="loginUsername"
            />
            <input 
                type="password" 
                placeholder="password" 
                onChange={(event) => setPassword(event.target.value)}
                className="loginPassword"
            />
            <button 
                onClick={handleClick}
                className="loginButton"
            >
            Login
            </button>
        </div>
    );
}
export default Login;