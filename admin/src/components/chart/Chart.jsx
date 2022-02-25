import './chart.css';
import { 
    LineChart, 
    Line, XAxis,
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
// Made charts from Recharts website with Simple Charts Heading under Examples


// title = Heading for Chart
// data = actual data in array to show in chart
// dataKey = y-axis values name from the data
// grid = boolean value to show whether we will show the background grid in chart or not

const Chart = ({ title, data, dataKey, grid }) => {
    
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>

            {/* Charts code from Rechart site */}    {/* aspect ratio = (width / height) */} 
            {/* Xaxis: To show the X - axis,
            dataKey: Which data to show on that axis, 
            stroke: color, Tooltip: Show details values on hovering the graph
            CartesianGrid: To show the bg grid behind the graph */}
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd"/>
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                </LineChart>
                
            </ResponsiveContainer>  
        </div>
    );
}

export default Chart;