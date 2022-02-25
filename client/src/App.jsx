
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cart from './pages/Cart.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';
import Register from './pages/Register.jsx';
import Success from './pages/Success.jsx';
import { useSelector } from "react-redux";


const App = () => { 

  // user will define whether the current user is already logged in or not      user != null => (user already logged in),  this user value will be used below to redirect from login and register page to home page
  let user = useSelector((state) => {return state.user.currentUser});                  

  return (
    <Router>
      <Routes>

        <Route 
          path="/"                                                        //{/* In new version of React, it matches exact path without writing extra exact */}
          element={<Home />} 
        />
      
        <Route path="products" element={<ProductList />}>                 {/* /products */}    
            <Route 
              path=":category" 
              element={<ProductList />} 
            />                                                            {/* /products/:category */}
        </Route>
        <Route path="product" element={<Product />}>                      {/* /products */}    
            <Route 
              path=":id" 
              element={<Product />} 
            />                                                            {/* /products/:id */}
        </Route>
        <Route 
          path="cart"                                                        
          element={<Cart />} 
        />
        <Route 
          path="success"                                                        
          element={<Success />} 
        />
        <Route 
          path="login" 
          element={user ? <Navigate to="/"/> : <Login />} 
        />                                                      {/* If user is logged in, then redirect to home page, else go to login page */}
        <Route 
          path="register"                                                        
          element={user ? <Navigate to="/"/> : <Register />} 
        />

      </Routes>
</Router>
  )
};

export default App;









