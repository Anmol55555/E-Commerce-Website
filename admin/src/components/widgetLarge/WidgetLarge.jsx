import './widgetLarge.css';
import { useState, useEffect } from 'react';
import { userRequest } from '../../requestMethods.js';
import { format } from 'timeago.js';        // npm i timeago.js   Used to represent time(order.createdAt) in clear way 
                                            // like 2 weeks ago,  1 month ago, etc instead of real date and time 
const WidgetLarge = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const res = await userRequest.get('orders');
            setOrders(res.data);
        }
        getOrders(); 
    }, []);

    const Button = ({type}) => {
        return <button className={"widgetLargeButton " + type}>{type}</button>
    }

    return (
        <div className="widgetLarge">
            <h3 className="widgetLargeTitle">Latest Transaction</h3>
            <table className="widgetLargeTable">
                <tr className="widgetLargeTr">
                    <th className="widgetLargeTh">Customers</th>
                    <th className="widgetLargeTh">Date</th>
                    <th className="widgetLargeTh">Amount</th>
                    <th className="widgetLargeTh">Status</th>   
                </tr>

                {orders.map((order) => (
                    <tr className="widgetLargeTr" key={order._id}>
                    <td className="widgetLargeUser">
                        <span className="widgetLargeName">{order.userId}</span>
                    </td>
                    <td className="widgetLargeDate">{format(order.createdAt)}</td>
                    <td className="widgetLargeAmount">${order.amount}</td>
                    <td className="widgetLargeStatus">
                    <Button type={order.status}/>
                    </td>
                </tr>
                ))}
                
            </table>
        </div>
    );
}

export default WidgetLarge;