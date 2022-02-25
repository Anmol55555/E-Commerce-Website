// This page is to define the media query for responsiveness
// We can either define media query for each styled components on each page or make a responsive.js file for it.
// 1st method:- 
// const Container = styled.div`                  ${'' /* use styled keyword then . then the html element we want the styles to do  and defination inside ` ` */}            
//     height: 60px;                              ${'' /* This make it equal to <div className="Container"></div> */} 

//     ${'' /* For responsiveness, we can make media query for each styled components like this or make a full js file for it */}
//     ${'' /* 
//     @media only screen and (max-width: 330px){
//         display: none;
//     } 
//     */}
// `  

import {css} from 'styled-components';

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 380px) {
            ${props}
        }
    `
};


// For Tablets
// export const tablet = (props) => {
//     return css `
//         @media only screen and (max-width: 780px) {
//             ${props}
//         }
//     `
// };
