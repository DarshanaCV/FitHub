import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import MoodCounter from "../../components/MoodCounter/MoodCounter";

const Home = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if (!userToken) {
            navigate("/signup");
        }
    }, []);


    return (
        <div className="home-component">
            <MoodCounter />
        </div>
    );
};

export default Home;
