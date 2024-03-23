import React from "react"
import { useNavigate } from 'react-router-dom'
import YogaPoseCard from '../../components/YogaPoseCard/YogaPoseCard'
import YogaHead from "../../components/YogaPoseCard/YogaHead"
import './Yoga.css'
const Yoga = () => {

    const navigate = useNavigate();
    React.useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if(!userToken){
            navigate("/signup")
        }
    },[])
    
    return (
        <div className="yoga_pose_container">
            <YogaHead />
            <div className="yoga_pose_card_container">
                <YogaPoseCard modelName="tree_pose"/>
                <YogaPoseCard modelName="warrior_pose"/>
                <YogaPoseCard modelName="mountain_pose"/>
                <YogaPoseCard modelName="lunge_pose"/>
                <YogaPoseCard modelName="goddess_pose"/>
            </div>
            
        </div>
    )
}

export default Yoga