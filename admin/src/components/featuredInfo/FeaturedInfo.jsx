import './featuredInfo.css';
// import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { userRequest } from '../../requestMethods.js';

const FeaturedInfo = () => {

    const [income, setIncome] = useState([]);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get('orders/income');
                setIncome(res.data);
            }
            catch (err) {
                console.log('some error');
            }
        }
        getIncome(); 
    }, [income]);

    // console.log(income);
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneycontainer">
                    <span className="featuredMoney">${income.length ? income[0].total : '0'}</span>
                </div>
                <span className="featuredSub">For the current month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneycontainer">
                    <span className="featuredMoney">$454</span>
                </div>
                <span className="featuredSub">For the current month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneycontainer">
                    <span className="featuredMoney">$2,232</span>
                    {/* <span className="featuredMoneyRate">
                    +5.2 <ArrowUpward className="featuredIcon"/>
                    </span> */}
                </div>
                <span className="featuredSub">For the current month</span>
            </div>
        </div>
    );
}

export default FeaturedInfo;