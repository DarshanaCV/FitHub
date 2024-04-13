import React, { useState, useEffect } from "react";
import { database } from "../../firebase_setup/firebase";
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./Chart.css"
const ProgressChart = ({ pose }) => {
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            navigate("/signup");
            return;
        }

        const userId = localStorage.getItem('uid');
        const userRef = ref(database, `/users/${userId}/yogaBestTime/${pose}`);
        get(userRef)
            .then((snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const chartDataArray = Object.entries(data).map(([date, time]) => ({ date, time }));
                    setChartData(chartDataArray);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [navigate, pose]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="chart-container">
            <LineChart width={800} height={400} data={chartData} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </div>
    );
}

export default ProgressChart;
