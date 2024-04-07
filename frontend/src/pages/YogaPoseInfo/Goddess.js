import React from 'react'
import axios from 'axios';
import "./YogaPoseInfo.css"
import { database, auth } from '../../firebase_setup/firebase';
import { get, ref ,update} from "firebase/database";
import { useNavigate } from "react-router-dom";

const Goddess=()=>{
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
            if(userData.yogaBestTime.goddess.bestTime<bestTime){
                const newData={
                    ...userData,
                    yogaBestTime:{
                        ...userData.yogaBestTime,
                        goddess:{
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
                setBestTime(userData.yogaBestTime.goddess.bestTime)
            }
            
        })
        .catch((error)=>{
            console.error(error);
        })
    }
        
    const handleButtonClick = async () => {
        const modelName="goddess_pose"
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
                    <h1>Goddess Pose</h1>
                    <p>Utkata Konasana</p>
                    <button onClick={handleButtonClick}>Get Started</button>
                </div>
                <div className="tree-head-right">
                    <p>level: Intermediate</p>
                    <p>Pronounciation</p>
                    <p>(Utkata: "Oot-kah-tah"<br/>
                        Konasana: "Koh-nah-sah-nah)</p>
                    <p>Best time:{bestTime}s</p>
                </div>
            </div>
            <div className="tree-video">
                <video height="500px" width="680px" autoPlay loop muted>
                    <source src="\media\yoga\goddess.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="tree-instructions">
                <p>
                    The Goddess Pose, or "Utkata Konasana" in Sanskrit, is a powerful yoga pose that strengthens the lower body, opens the hips, and improves balance. Here's how to do it:<br/>
                    1. Starting Position: Begin standing tall at the top of your mat with your feet about 3-4 feet apart, toes pointing out at a 45-degree angle. Keep your arms by your sides, palms facing forward.<br/>
                    2. Engage Core: Engage your core muscles by drawing your navel in toward your spine. This will help stabilize your torso throughout the pose.<br/>
                    3. Bend Your Knees: Bend your knees deeply, sinking your hips down toward the level of your knees. Keep your knees tracking in line with your toes; don't let them collapse inward or push too far past your toes.<br/>
                    4. Arms Positioning: Bring your arms out to the sides at shoulder height, bending your elbows to form a cactus shape with your arms. Your palms can either face forward or be turned to face each other, whichever feels more comfortable for you.<br/>
                    5. Torso Position: Keep your torso upright, with your spine lengthened and your chest lifted. Try to avoid leaning forward or backward.<br/>
                    6. Sink Deeper: If you're comfortable, sink deeper into the pose by lowering your hips a little more toward the level of your knees. Keep pressing down through your feet to maintain stability.<br/>
                    7. Hold the Pose: Hold the Goddess Pose for several breaths, focusing on maintaining your alignment and feeling the strength and stability in your lower body.<br/>
                    8. Release: To come out of the pose, straighten your legs and bring your arms back down by your sides.<br/>
                    9. Repeat: You can repeat the Goddess Pose a few times, holding it for as long as feels comfortable for you.<br/>
                </p>
                
            </div>
        </div>
    )
}

export default Goddess