import styled from 'styled-components';
// import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { useState } from 'react';
import { sliderItems } from '../data.js'
import { mobile } from '../responsive.js'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile(
        {
            display: "none"
        }
    )}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);   ${'' /* 0vw=> ist slide,  -100vw=> 2nd slide, -200vw=> 3rd slide */}          
`
const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.bg};
`

const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
`

const Image = styled.img`
    height: 80%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction === "left")
        {
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);               // 2, since total 3 slide, hence indexes = 0, 1, 2
        }
        else
        {
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        }
    }

    function scrollToCategories(){
        const categories = document.getElementById('categories');
        categories.scrollIntoView({ behavior: 'smooth' });
      }

    return(
        <Container>
            <Arrow direction="left" onClick={() => {handleClick("left")}}>                    {/* direction sending as a prop */}  
                <ArrowBackIosOutlinedIcon/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}> 
                {sliderItems.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Button onClick={scrollToCategories}>SHOP NOW</Button>
                    </InfoContainer>
                </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => {handleClick("right")}}>
                <ArrowForwardIosOutlinedIcon/>
            </Arrow>
        </Container>    
    )
}

export default Slider;