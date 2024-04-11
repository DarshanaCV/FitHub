import React from "react";
import ProgressChart from "../../components/Charts/ProgressChart";
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
            <div className="yoga-pose-progress">
                <div className="select-pose">
                    {displayPoseCard()}
                </div>
                {poseName && <ProgressChart pose={poseName} />} {/* Render ProgressChart only if poseName is set */}
            </div>
        </div>
    );
};

export default Reports;
