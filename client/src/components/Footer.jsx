import styled from 'styled-components';
// import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import LocalPhoneRoundedIcon from '@material-ui/icons/LocalPhoneRounded';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { mobile } from '../responsive.js';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    ${mobile(
        {                                         
            flexDirection: "column"
        }
    )}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
    
`
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex; 
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile(
        {                                         
            display: "none"
        }
    )}
`
const Title = styled.h1`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px; 
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile(
        {                                         
            backgroundColor: "#fff8f8"
        }
    )}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;

`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>LAMA.</Logo>
                <Desc>
                    There are many variations of passages of Lorem Ipusm available, but the majority have suffered 
                    alteration in some form, by injected humour, or randomised words which don't look even
                    slighly believable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="#385999">
                        <FacebookIcon/>
                    </SocialIcon>
                    <SocialIcon color="#E1306C">
                        <InstagramIcon/>
                    </SocialIcon>
                    <SocialIcon color="#55ACEE">
                        <TwitterIcon/>
                    </SocialIcon>
                    <SocialIcon color="#E60023">
                        <PinterestIcon/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem><Link to="/" className="linkStyle">Home</Link></ListItem>
                    <ListItem><Link to="/cart" className="linkStyle">Cart</Link></ListItem>
                    <ListItem>Men Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <PlaceOutlinedIcon style={{marginRight: "10px"}}/>622 Dixie Path, South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                    <LocalPhoneRoundedIcon style={{marginRight: "10px"}}/>+91 23456 78910
                </ContactItem>
                <ContactItem>
                    <EmailOutlinedIcon style={{marginRight: "10px"}}/>contact@lama.gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    )
}

export default Footer;

