import React from "react";
import ProgressChart from "../../components/Charts/ProgressChart";
import MeditationChart from "../../components/Charts/MeditationChart";
import { useNavigate } from 'react-router-dom';
import "./Reports.css";

const Reports = () => {
    const [poseName,setPoseName]=React.useState("goddess")
    const [selectedPose, setSelectedPose] = React.useState("goddess");
    const navigate = useNavigate();
    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if (!userToken) {
            navigate("/signup");
        }
    }, []);

    const selectPoseChart = (selectedPose) => {
        setPoseName(selectedPose);
        setSelectedPose(selectedPose);
    };

    const displayPoseCard = () => {
        const poses = ["goddess", "tree", "mountain", "lunge", "warrior"];
        return poses.map((pose) => (
            <div 
             className={`poses ${selectedPose === pose ? 'selected' : ''}`}
             key={pose} 
             onClick={() => selectPoseChart(pose)}
            >
                <p>{pose}</p>
            </div>
        ));
    };

    return (
        <div className="reports-component">
            <div className="meditation-chart">
                <h1>Custom Meditation</h1>
                <MeditationChart/>
            </div>
            
            <div className="yoga-pose-progress">
                <h1>Yoga progress chart</h1>
                <div className="select-pose">
                    {displayPoseCard()}
                </div>
                {poseName && <ProgressChart pose={poseName} />}
            </div>
        </div>
    );
};

export default Reports;