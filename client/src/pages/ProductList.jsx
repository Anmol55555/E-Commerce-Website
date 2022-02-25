import styled from 'styled-components';
import Navbar from '../components/Navbar.jsx';
import Announcement from '../components/Announcement.jsx';
import Products from '../components/Products.jsx';
import Newsletter from '../components/Newsletter.jsx';
import Footer from '../components/Footer.jsx';
import { mobile } from '../responsive.js';
import { useLocation } from 'react-router-dom';                     // useLocation = To get the path of URL to get the category parameter
import { useState } from 'react';

const Container = styled.div`

`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile(
        {                                         
            margin: "0px 20px",
            display: "flex",
            flexDirection: "column"
        }
    )}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile(
        {                                         
            marginRight: "0px"
        }
    )}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile(
        {                                         
            margin: "10px 0px"
        }
    )}
`

const Option = styled.option`

`

const ProductList = () => {
    const location = useLocation();                             // location.pathname = /products/:category
    const cat = location.pathname.split("/")[2];                // cat = category parameter in url
    const [filters, setFilters] = useState({});                 // color and size filter options on the product page
    const [sort, setSort] = useState("newest");                 // sort filter option on the product page

    const handleFilters = (event) => {
        const value = event.target.value;
        setFilters({                                    // It will set filters like filters = { color:"red", size:"M" }
            ...filters,                                 // ... => spread operator
            [event.target.name]: value, 
        });         
    }
    
    return (
        <Container>
            <Navbar />
            <Announcement/>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option value="white">white</Option>
                        <Option value="black">black</Option>
                        <Option value="red">red</Option>
                        <Option value="blue">blue</Option>
                        <Option value="yellow">yellow</Option>
                        <Option value="green">green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option value="XS">XS</Option>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products</FilterText>
                    <Select onChange={(event) => {setSort(event.target.value);}}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList;