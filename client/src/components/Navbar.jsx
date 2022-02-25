

// import MenuIcon from '@material-ui/icons/Menu';
import { Badge } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import React from 'react';
import styled from 'styled-components';             // style components:- To use style components, do this:- npm i styled-components
import { mobile } from '../responsive.js';
import { useSelector } from "react-redux";          // importing Hooks from react-redux
import { Link } from 'react-router-dom';


 // Using Material Icon Framework for react,  First install using npm install @material-ui/core @material-ui/icons, then search icon on material UI site for icon
// Styled Components
const Container = styled.div`                  ${'' /* use styled keyword then . then the html element we want the styles to do  and defination inside */}        
    height: 60px;                              ${'' /* This make it equal to <div className="Container"></div> */} 

    ${'' /* For responsiveness, we can make media query for each styled components like this or make a full js file for it */}
    ${'' /* 
    @media only screen and (max-width: 330px){
        display: none;
    } 
    */}
                                                ${'' /* passing style object(json) as prop for mobile responsiveness */}
    ${mobile(
        {                                         
            height: "50px"
        }
    )}
`                  
const Wrapper = styled.div `
    padding: 10px 20px;
    display: flex;                  ${'' /* To make internal components in horizontal manner  */}                       
    justify-content: space-between;
    align-items: center;
    ${mobile(
        {
            padding: "10px 0px"
        }
    )}
`

const Left = styled.div `
    flex: 1;                ${'' /* equivalent to width: 33.3333% i.e.  1/3rd part of the screen  for 3 componnents having flex = 1 */}     
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile(
        {
            display: "none"
        }
    )}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
`
const Input = styled.input`
    border: none;
    ${mobile(
        {
            width: "50px"
        }
    )}
`

const Center = styled.div `
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    ${mobile(
        {
            fontSize: "24px"
        }
    )}
`

const Right = styled.div `
    flex: 1; 
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile(
        {
            flex: "2",
            justifyContent: "center"
        }
    )}
`
const MenuItem = styled.div`
    fonst-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile(
        {
            fontSize: "12px",
            marginLeft: "10px"
        }
    )}
`


const Navbar = () => {
    const cart = useSelector((state) => {return state.cart});           // cart = cart values in redux reducer(i.e. product[], quantity, total)

    return (
        <Container>             {/* equivalent to <div className="Container" with style under .container{} */}
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <SearchIcon style={{color:"gray", fontSize:"16px"}}/>
                    </SearchContainer>
                </Left>
 
                <Center>
                    <Link to="/" className="linkStyle"><Logo>LAMA.</Logo></Link>
                </Center>

                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <Link to="/login" className="linkStyle">
                        <MenuItem>SIGN IN</MenuItem>
                    </Link>
                    <Link to="/cart" className="linkStyle">
                        <MenuItem>
                            <Badge badgeContent={cart.quantity} color="primary">
                                <ShoppingCartOutlinedIcon/>
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;
