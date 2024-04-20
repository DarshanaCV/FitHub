import React from 'react'
import axios from 'axios';
import "./YogaPoseInfo.css"
import { database, auth } from '../../firebase_setup/firebase';
import { get, ref ,update} from "firebase/database";
import { useNavigate } from "react-router-dom";

const Lunge=()=>{
    const [bestTime,setBestTime]=React.useState(0)
    const [time, setTime] = React.useState(0);
    const navigate = useNavigate();
    console.log(bestTime);
    React.useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if(!userToken){
            navigate("/signup")
        }
    },[])

    const getBestTime = (userId) => {
        const id = userId;
        const currentDate = new Date().toISOString().split('T')[0];
        const userRef = ref(database, `/users/${id}`);
        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();
                const lunge_data = userData?.yogaBestTime?.lunge || {};
                let maxBestTime = -Infinity;
                for (const date in lunge_data) {
                    if (lunge_data[date] > maxBestTime) {
                        maxBestTime = lunge_data[date];
                    }
                }
                setBestTime(maxBestTime);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const updateBestTime = (userId, newTime) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const userRef = ref(database, `/users/${userId}`);
    get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            let newBestTime = { ...userData.yogaBestTime.lunge };
            console.log(newBestTime);
            if (!newBestTime[currentDate] || newTime < newBestTime[currentDate]) {
                newBestTime[currentDate] = newTime;
            }
            const newData = {
                ...userData,
                yogaBestTime: {
                    ...userData.yogaBestTime,
                    lunge: newBestTime,
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

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getBestTime(user.uid);
            } else {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    }, []);
        
    const handleButtonClick = async () => {
        const modelName="lunge_pose"
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
                    <h1>Lunge Pose</h1>
                    <p>Anjaneyasana</p>
                    <button onClick={handleButtonClick}>Get Started</button>
                </div>
                <div className="tree-head-right">
                    <p>level: Intermediate</p>
                    <p>Pronounciation</p>
                    <p>(An-juh-ney-uh-suh-nuh)</p>
                    <p>Best time:{bestTime}s</p>
                </div>
            </div>
            <div className="tree-video">
                <video height="500px" width="680px" autoPlay loop muted>
                    <source src="\media\yoga\lunge.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="tree-instructions">
                <p>
                    Lunges help strengthen and tone the lower body muscles, including the quadriceps, hamstrings, glutes, and calves, while also improving balance and flexibility.
                    Here's a step-by-step guide on how to do lunge:<br/>
                    1. Start in Mountain Pose (Tadasana): Stand tall with your feet hip-width apart and your arms relaxed by your sides.<br/>
                    2. Step Back: Take a big step back with your right foot. Keep your toes pointing forward and your heel lifted. Your feet should be about hip-width apart, with your left knee directly above your left ankle.<br/>
                    3. Lower the Back Knee: Lower your right knee gently to the floor. You may want to pad the knee with a blanket or towel for comfort.<br/>
                    4. Engage Core: Engage your core muscles by drawing your navel in toward your spine. This will help stabilize your torso.<br/>
                    5. Hips Square: Keep your hips squared toward the front of the mat. You can achieve this by gently tucking your tailbone under.<br/>
                    6. Lift the Chest: As you inhale, lift your chest and gently arch your back, allowing your shoulder blades to come together slightly.<br/>
                    7. Arms Positioning: You can keep your hands resting on your front thigh for support, or you can raise your arms overhead, reaching them toward the ceiling. If raising your arms, keep your shoulders relaxed away from your ears.<br/>
                    8. Neck and Head: Keep your gaze forward or slightly upward, maintaining a straight line from your head to your tailbone.<br/>
                    9. Hold the Pose: Hold the lunge pose for several breaths, allowing your body to sink deeper into the stretch with each exhale.<br/>
                    10. Switch Sides: To come out of the pose, gently bring your hands back to the floor and step your right foot forward to meet your left foot. Then, repeat the lunge pose on the opposite side, stepping your left foot back this time.<br/>
                </p>
                
            </div>
        </div>
    )
}

export default Lunge
