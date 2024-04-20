import React from 'react'
import axios from 'axios';
import "./YogaPoseInfo.css"
import { database, auth } from '../../firebase_setup/firebase';
import { get, ref ,update} from "firebase/database";
import { useNavigate } from "react-router-dom";

const Mountain=()=>{
    
    const [bestTime,setBestTime]=React.useState(0)
    const [time, setTime] = React.useState(0);
    const navigate = useNavigate();
    
    React.useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        if(!userToken){
            navigate("/signup")
        }
    },[])

    React.useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                getBestTime(user.uid);
            } else {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    },[bestTime])

    const getBestTime = (userId) => {
        const id = userId;
        const currentDate = new Date().toISOString().split('T')[0];
        const userRef = ref(database, `/users/${id}`);
        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();
                const mountain_data = userData?.yogaBestTime?.mountain || {};
                let maxBestTime = -Infinity;
                for (const date in mountain_data) {
                    if (mountain_data[date] > maxBestTime) {
                        maxBestTime = mountain_data[date];
                    }
                }
                setBestTime(maxBestTime);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const updateBestTime = (userId, newTime) => {
    // const currentDate = new Date().toISOString().split('T')[0];
    const currentDate = '2024-04-12'
    const userRef = ref(database, `/users/${userId}`);
    get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            let newBestTime = { ...userData.yogaBestTime.mountain };
            console.log(newBestTime);
            if (!newBestTime[currentDate] || newTime < newBestTime[currentDate]) {
                newBestTime[currentDate] = newTime;
            }
            const newData = {
                ...userData,
                yogaBestTime: {
                    ...userData.yogaBestTime,
                    mountain: newBestTime,
                },
            };
            update(userRef, newData)
                .then(() => {
                    console.log("Yoga best time updated successfully");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const handleButtonClick = async () => {
        const modelName="mountain_pose"
        console.log("Button clicked:", modelName);
        try {
            const result = await axios.post('http://localhost:5000/run-model', { modelName });
            setTime(result.data.best_time);
            updateBestTime(auth.currentUser.uid, result.data.best_time);
            
        } catch (error) {
            console.error('Error sending request to Flask:', error.message);
        }
    };

    return(
        <div className="tree-container">
            <div className="tree-head">
                <div className="tree-head-left">
                    <h1>Mountain Pose</h1>
                    <p>Tadasana</p>
                    <button onClick={handleButtonClick}>Get Started</button>
                </div>
                <div className="tree-head-right">
                    <p>level: Begineer</p>
                    <p>Pronounciation</p>
                    <p>(tah-dah-SAH-nah)</p>
                    <p>Best time:{bestTime}s</p>
                </div>
            </div>
            <div className="tree-video">
                <video height="500px" width="680px" autoPlay loop muted>
                    <source src="\media\yoga\mountain.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="tree-instructions">
                <p>
                    Mountain pose improves posture, strengthens the legs and core, and promotes a sense of grounding and stability.<br/>
                    1. Starting Position: Begin by standing at the top of your mat with your feet together or hip-width apart, whichever feels more comfortable for you. Distribute your weight evenly across both feet.<br/>
                    2. Alignment: Align your feet parallel to each other, with toes pointing forward. Spread your toes wide and distribute the weight evenly across the soles of your feet.<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;  2.1.   Engage your thigh muscles by lifting your kneecaps slightly. Activate your core by drawing your navel gently toward your spine.<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;  2.2.   Lengthen your spine by lifting through the crown of your head. Imagine your spine growing taller with each breath.<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;  2.3.   Roll your shoulders back and down, allowing your chest to open up. Keep your arms relaxed by your sides.<br/>
                    3. Breathing: Take slow, deep breaths. Inhale deeply through your nose, expanding your chest and abdomen. Exhale fully through your nose, releasing any tension from your body.<br/>
                    4. Hand Position: You have a few options for your hand placement<br/>
                    5. Allow your arms to hang naturally by your sides, with palms facing inward or forward.<br/>
                    6. Bring your palms together in front of your chest in a prayer position, known as Anjali Mudra.<br/>
                    7. Reach your arms overhead, with palms facing each other or touching.<br/>
                    8. Focus and Relaxation: Soften your gaze and focus on a point in front of you or close your eyes gently if you feel comfortable. Relax your facial muscles, jaw, and shoulders while maintaining a sense of alertness and awareness.<br/>
                    9. Hold: Hold the Mountain Pose for 30 seconds to 1 minute, or longer if you prefer. Focus on your breath and the sensations in your body. Feel rooted like a mountain, stable and grounded.<br/>
                    10. Release: To come out of the pose, gently release your arms if they're lifted and return them to your sides. Relax any engaged muscles, but maintain the tall posture for a moment before moving on to the next pose or activity.<br/>
                </p>
                
            </div>
        </div>
    )
}

export default Mountain