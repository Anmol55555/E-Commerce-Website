import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";              // To dispatch the redux functionality
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from '../redux/apiCalls.js';           // To use apiCalls.js for redux function


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.4), 
        rgba(255,255,255,0.4)
    ),  
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile(
        {                                         
            width: "75%"
        }
    )}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%; 
    margin: 10px 0px;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {                ${'' /* i.e. when LOGIN button is disabled, then it should look like disabled */}
        color: green;
        cursor: not-allowed;
    }
`
const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer; 
`
const Error = styled.span`
    color: red;
`


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => {return state.user});      // isFetching will be used to disable login button while server is verifying the credentials, and error is used for showing error if the credentials are wrong

    const handleClick = (event) => {
        event.preventDefault();
        login(dispatch, { username, password });            // To apiCall.js  (Redux)
    }
    
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input 
                        placeholder="username"
                        type="text"
                        onChange = {(event) => setUsername(event.target.value)}    
                    />
                    <Input 
                        placeholder="password"
                        type="password"
                        onChange = {(event) => setPassword(event.target.value)}
                    />
                    <Button onClick={ handleClick } disabled={ isFetching }>LOGIN</Button>  {/* When we click login, then till the time of verification, the button should be disabled as we set in userRedux.js through apiCall.js that at start the isFetching = true, and when verification is done, then isFetching = false             */}
                    {error && <Error>Something went Wrong...</Error>}           {/*  if error = true , show error */}
                    <Link>DO YOU NOT REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;