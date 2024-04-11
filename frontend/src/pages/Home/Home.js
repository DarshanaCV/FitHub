import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";

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
            <h1>Home</h1>
        </div>
    );
};

export default Home;
