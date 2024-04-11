import React from "react";
import GoddessChart from "../../components/Charts/GoddessChart";
import LungeChart from "../../components/Charts/LungeChart";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import TreeChart from "../../components/Charts/TreeChart";
import MountainChart from "../../components/Charts/MountainChart";
import WarriorChart from "../../components/Charts/WarriorChart";

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
            <h1>How does the App work?</h1>
            <GoddessChart /><br/>
            <LungeChart /><br/>
            <TreeChart/><br/>
            <MountainChart/><br/>
            <WarriorChart/>
        </div>
    );
};

export default Home;
