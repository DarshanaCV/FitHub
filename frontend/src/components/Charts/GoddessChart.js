import React, { useState, useEffect } from "react";
import { database } from "../../firebase_setup/firebase";
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GoddessChart=()=>{
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        // console.log("signed in");
        if (!userToken) {
            navigate("/signup");
        }
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('uid');
        const userRef = ref(database, `/users/${userId}/yogaBestTime/goddess`);
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
    }, [navigate]);

    // Custom formatter function to display only the date part
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return(
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h4>Goddess Pose</h4>
            <LineChart width={1000} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#8884d8" />
            </LineChart>
        </div>
    )
    

}

export default GoddessChart