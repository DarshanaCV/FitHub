import React from 'react'
import axios from 'axios';
import "./YogaPoseInfo.css"
import { database, auth } from '../../firebase_setup/firebase';
import { get, ref ,update} from "firebase/database";
import { useNavigate } from "react-router-dom";

const Warrior=()=>{
    const [bestTime,setBestTime]=React.useState(0)
    const navigate = useNavigate();
    
    React.useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if(!userToken){
            navigate("/signup")
        }
    },[])

    React.useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                getData(user.uid);
            } else {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    },[bestTime])

    const getData=()=>{
        console.log(auth.currentUser.reloadUserInfo.localId);
        const id=auth.currentUser.reloadUserInfo.localId
        const currentDate = new Date().toISOString().split('T')[0];
        const userRef=ref(database,`/users/${id}`)

        get(userRef)
        .then((snapshot)=>{
            const userData=snapshot.val()
            if(userData.yogaBestTime.warrior.bestTime<bestTime){
                const newData={
                    ...userData,
                    yogaBestTime:{
                        ...userData.yogaBestTime,
                        warrior:{
                            date:`${currentDate}`,
                            bestTime:bestTime
                        }
                    }
                }
                update(userRef,newData)
                .then(()=>{
                    setBestTime(bestTime)
                    console.log(`best time updated successfully ${bestTime}`);
                })
                .catch((error)=>{
                    console.error(error);
                })
            }
            else{
                console.log("best time is greater");
                setBestTime(userData.yogaBestTime.warrior.bestTime)
            }
            
        })
        .catch((error)=>{
            console.error(error);
        })
    }
        
    const handleButtonClick = async () => {
        const modelName="warrior_pose"
        console.log("Button clicked:", modelName);
        try {
            const result = await axios.post('http://localhost:5000/run-model', { modelName });
            setBestTime(result.data.best_time)
            console.log(result);
            
        } catch (error) {
            console.error('Error sending request to Flask:', error.message);
        }
    };

    return(
        <div className="tree-container">
            <div className="tree-head">
                <div className="tree-head-left">
                    <h1>Warrior Pose</h1>
                    <p>Virabhadrasana II</p>
                    <button onClick={handleButtonClick}>Get Started</button>
                </div>
                <div className="tree-head-right">
                    <p>level: Intermediate</p>
                    <p>Pronounciation</p>
                    <p>(Veer-buh-DRAH-suh-nuh)</p>
                    <p>Best time:{bestTime}s</p>
                </div>
            </div>
            <div className="tree-video">
                <video height="500px" width="680px" autoPlay loop muted>
                    <source src="\media\yoga\warrior.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="tree-instructions">
                <p>
                    Warrior 2 pose, also known as "Virabhadrasana II" in Sanskrit, is a standing yoga pose that strengthens 
                    the legs, stretches the groins and torso, and builds focus and stability. Here's how to do Warrior 2 pose:<br/>
                    1. Starting Position: Begin in a standing position (Mountain Pose or Tadasana). <br/>
                    2. Step Back: Step your feet about 3 to 4 feet apart, with your right foot pointing forward and your left foot pointing slightly inward.<br/>
                    3. Align Your Feet: Align your right heel with the arch of your left foot. Your right foot should be pointing towards the front edge of your mat.<br/>
                    4. Square Your Hips: Rotate your left hip towards the back of the mat, and your right hip towards the front of the mat. Your hips should be parallel to the side of your mat.<br/>
                    5. Bend Your Front Knee: Bend your right knee directly over your right ankle, keeping the shin perpendicular to the floor. Your thigh should be parallel to the floor.<br/>
                    6. Extend Your Arms: Extend your arms parallel to the floor, reaching actively out to the sides with your palms facing down. Your arms should be in line with your shoulders.<br/>
                    7. Gaze Forward: Turn your head to gaze over your right hand, keeping your neck relaxed.<br/>
                    8. Lengthen Your Spine: Lengthen through your spine, reaching the crown of your head towards the ceiling.<br/>
                    9. Engage Your Core: Draw your navel in towards your spine to engage your core muscles.<br/>
                    10. Sink Into the Pose: Sink down into your front thigh, keeping your back leg strong and straight. Your weight should be evenly distributed between both feet.<br/>
                    11. Hold the Pose: Hold the Warrior 2 pose for 30 seconds to 1 minute, breathing deeply and steadily.<br/>
                    12. Switch Sides: To release the pose, straighten your front leg and step your feet back together. Repeat the pose on the opposite side, stepping your left foot forward and your right foot back.<br/>
                </p>
                
            </div>
        </div>
    )
}

export default Warrior