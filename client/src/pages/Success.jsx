// Success page after conformation of payment in cart page

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";        // for axios request

const Success = () => {
  const location = useLocation();                       // to get current path in the url
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {         // creating an order by giving a post request of loclhost:5000/api/orders/
          userId: currentUser._id,                              // this whole json part from userid to address is req.body which will be used to create the product as these things are required in the order model
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);                             // setting the order Id from the response get from the api post request 
      } catch {}
    };
    data && createOrder();                              // if data exist => then call createorder() 
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;
