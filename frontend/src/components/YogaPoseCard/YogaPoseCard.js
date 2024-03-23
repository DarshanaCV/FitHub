import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../pages/Yoga/Yoga';

const YogaPoseCard = ({ modelName }) => {
    const [photoName, setPhotoName] = useState('');
    const [photoPath, setPhotoPath] = useState('');

    useEffect(() => {
        switch (modelName){
            case "warrior_pose":
                setPhotoPath("./media/warrior.png");
                setPhotoName("Warrior pose")
                break;
            case "goddess_pose":
                setPhotoPath("./media/3-goddess.png");
                setPhotoName("Goddess pose")
                break;
            case "mountain_pose":
                setPhotoPath("./media/5-mountain (3).png");
                setPhotoName("Mountain pose")
                break;
            case "lunge_pose":
                setPhotoPath("./media/9-lunge.png");
                setPhotoName("Lunge pose")
                break;
            case "tree_pose":
                setPhotoPath("./media/11-tree.png");
                setPhotoName("Tree pose")
                break;
            default:
                setPhotoPath(""); 
        }
    }, [modelName]);

    const handleButtonClick = async () => {
        console.log("Button clicked:", modelName);
        try {
            const result = await axios.post('http://localhost:5000/run-model', { modelName });
            console.log(result);
            
        } catch (error) {
            console.error('Error sending request to Flask:', error.message);
        }
    };

    return (
        <div className="yoga_pose_card" onClick={handleButtonClick}>
            {photoName && <img src={photoPath} alt={photoName} />}
            <div className="pose_name">
                <p>{photoName}</p>
            </div>
        </div>
    );
};

export default YogaPoseCard;
