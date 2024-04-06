import React, { useState, useEffect } from "react";
import '../../pages/Yoga/Yoga';
import { NavLink, useNavigate } from "react-router-dom";

const YogaPoseCard = ({ modelName }) => {
    const [photoName, setPhotoName] = useState('');
    const [photoPath, setPhotoPath] = useState('');
    const [path,setPath]=useState('');
    const navigate = useNavigate();

    useEffect(() => {
        switch (modelName){
            case "warrior_pose":
                setPhotoPath("./media/warrior.png");
                setPhotoName("Warrior pose")
                setPath("/warrior")
                break;
            case "goddess_pose":
                setPhotoPath("./media/3-goddess.png");
                setPhotoName("Goddess pose")
                setPath("/goddess")
                break;
            case "mountain_pose":
                setPhotoPath("./media/5-mountain (3).png");
                setPhotoName("Mountain pose")
                setPath("/mountain")
                break;
            case "lunge_pose":
                setPhotoPath("./media/9-lunge.png");
                setPhotoName("Lunge pose")
                setPath("/lunge")
                break;
            case "tree_pose":
                setPhotoPath("./media/11-tree.png");
                setPhotoName("Tree pose")
                setPath("/tree")
                break;
            default:
                setPhotoPath(""); 
        }
    }, [modelName]);

    const handleButtonClick=()=>{
        navigate(`${path}`);
    }

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
