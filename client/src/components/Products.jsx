import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data.js'
import ProductItem from './ProductItem';
import axios from 'axios';                  // axios is a library (npm package) to fetch the data from api easily without writing complex code which involves promises

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
` 



const Products = ({ cat, filters, sort }) => {

    const [products, setProducts] = useState([]);                       // the products user want with any category applied on the url link
    const [filteredProducts, setFilteredProducts] = useState([]);       // The products after applying filters (i.e. color, size of products)

    useEffect(() => {                               // To fetch products data from our api according to the category mentioned
        const getProducts = async () => {
            try {
                const res = await axios.get(                                    // putting a get request to our created api
                    cat ? `http://localhost:5000/api/products?category=${cat}`      // If the category is present in the request, then we will present just that category products
                        : "http://localhost:5000/api/products"                      // otherwise all products will be shown
                );                    
                setProducts(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [cat])   

    useEffect(() => {
        cat &&                             
          setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
      }, [products, cat, filters]);

    // console.log(cat);
    // console.log(filters);
    // console.log(products);
    

    useEffect(() => {
        if(sort === "newest") {
            setFilteredProducts((prevState) => {
                return [...prevState].sort((a, b) => a.createdAt - b.createdAt)
            });
        }
        else if (sort === "asc") {
            setFilteredProducts((prevState) => {
                return [...prevState].sort((a ,b) => a.price - b.price)
            });
        }
        else {
            setFilteredProducts((prevState) => {
                return [...prevState].sort((a, b) => b.price - a.price)
            });
        }
    }, [sort]);
    // console.log(sort);
    // console.log(filteredProducts);

    return (
        <Container> 
            {cat                                                    // For Home page, such that there is no category specified, hence then we will simply use products variable only
               ? filteredProducts.map((item) =>  <ProductItem item={item} key={item.id}/> )
               : products
                    .slice(0, 8)                                    // only 8 products will be displayed at the home page
                    .map((item) =>  <ProductItem item={item} key={item.id} /> )
            }   
        </Container>
    )
}

export default Products;