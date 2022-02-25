import styled from 'styled-components';
import CategoryItem from './CategoryItem.jsx'
import { categories } from '../data';
import { mobile } from '../responsive.js';

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile(
        {
            padding: "0px",
            flexDirection: "column"
        }
    )}
`

const Categories = () => {
    return (
        <Container id="categories">
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Categories; 