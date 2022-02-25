
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import './app.css';
import Home from "./pages/home/Home.jsx";
import UserList from "./pages/userList/UserList.jsx";
import User from "./pages/user/User.jsx";
import NewUser from "./pages/newUser/NewUser.jsx";
import ProductList from "./pages/productList/ProductList.jsx";
import Product from "./pages/product/Product.jsx";
import NewProduct from "./pages/newProduct/NewProduct.jsx";
import Login from "./pages/login/Login.jsx";


const Layout = () => (      // Using Layout(Outlet) from react-router-dom to use <Topbar /> , <Sidebar />, <div> without any <Route> parent inside <Routes> tag. which will not be possible if used directly inside <Routes> tag.
  <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <Outlet />            {/* The outlet will be everything inside =>  <Route element={<Layout />}> */}  
    </div>
  </>
);



const App = () => {
  // Getting isAdmin boolean value, whether the current user is Admin or not from the localStorage location
  // If the user is admin, then show these admin pannel components pages, otherwise not.
  const isAdmin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;

  return (
    <Router>
        <Routes>
            <Route                              // Login routing is at the top to not show the Topbar and Sidebar by default as the user is not logged in yet         
              path="login"                                                        
              element={isAdmin ? <Navigate to="/"/> : <Login />} 
            />
            <Route element={<Layout />}>
            {
              isAdmin &&
              <>  
                  {/* //In new version of React, it matches exact path without writing extra exact keyword */}
                  <Route 
                    path="/"                                                        
                    element={<Home />} 
                  />
                  <Route 
                    path="users"                                                        
                    element={<UserList />} 
                  />
                  <Route path="user" element={<User />}>                    {/* /user */}    
                      <Route                                                
                        path=":userId" 
                        element={<User />} 
                      />                                                    {/* /user/:userId */}
                  </Route>
                  <Route 
                    path="newUser"                                                        
                    element={<NewUser />} 
                  />
                  
                  <Route 
                    path="products"                                                        
                    element={<ProductList />} 
                  />
                  <Route path="product" element={<Product />}>                 {/* /product */}    
                      <Route 
                        path=":productId" 
                        element={<Product />} 
                      />                                                        {/* /product/:productId */}
                  </Route>
                  <Route 
                    path="newproduct"                                                        
                    element={<NewProduct />} 
                  />
              </>
            }
            </Route>
        </Routes>
    </Router>

  );
}

export default App;
