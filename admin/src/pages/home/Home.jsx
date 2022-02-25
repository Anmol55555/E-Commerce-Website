import './home.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo.jsx';
import Chart from '../../components/chart/Chart.jsx';
import { userData } from '../../dummyData.js';                          // Was used for Charts in Home page 
import WidgetSmall from '../../components/widgetSmall/WidgetSmall.jsx';
import WidgetLarge from '../../components/widgetLarge/WidgetLarge.jsx';
import { useState, useMemo, useEffect } from 'react';
import { userRequest } from '../../requestMethods.js';

const Home = () => {

    const [userStats, setUserStats] = useState([]);

    const MONTHS = useMemo(                                // For Chart at home page
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("users/stats");
                res.data.map((item) => 
                    setUserStats((prev) => [
                        ...prev,
                        {name: MONTHS[item._id-1], "Active User": item.total}
                    ])
                );
            }
            catch (err) {

            }
        }
        getStats();
    }, [MONTHS]);

    // console.log(userStats);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid={true} dataKey="Active User"/>
            <div className="homeWidgets">
                <WidgetSmall />
                <WidgetLarge />
            </div>

        </div>
    );
}

export default Home;