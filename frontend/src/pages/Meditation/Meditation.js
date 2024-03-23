import React, { useState, useEffect} from "react";
import { auth, database } from '../../firebase_setup/firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom'
import '../../pages/Meditation/Meditation.css';
import MeditationTimer from '../../components/MeditationTimer/MeditationTimer';
import Timer from "../../Timer/Timer";

const Meditation = () => {
    const [sessionDuration, setSessionDuration] = useState(10);
    const [timerRunning, setTimerRunning] = useState(false);
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userId = user.uid;
                const userRef = ref(database, `users/${userId}/username`);
                onValue(userRef, (snapshot) => {
                    const username = snapshot.val();
                    setDisplayName(username);
                });
            } else {
                setDisplayName(null);
            }
        });

        return () => unsubscribe();
    }, []);
    const navigate = useNavigate();
        React.useEffect(()=>{
            const userToken = localStorage.getItem('userToken');
            console.log("signed in");
            if(!userToken){
                navigate("/signup")
            }
        },[])

    const handleDurationChange = (newDuration) => {
        setSessionDuration(newDuration);
    };

    return (
        <div className='meditation-container'>
            <div className="meditation-head-container">
                <div className='meditation-head-info'>
                    <h2>Hello, {displayName}</h2>
                    <h1>The Minds nature</h1>
                    <h1 className='heading'>is to think</h1>
                    <p>Meditation gives peace and quiet aginst the stresses<br/> 
                    of everyday life and opens the door to the deepest<br/>
                    and the devine part of ourselves</p><br/>
                    <button>Get started</button>
                </div>
                <img src="./media/meditate/2.png" alt="meditate"/>
            </div>
            <MeditationTimer
                duration={sessionDuration}
                timerRunning={timerRunning}
                onStart={() => setTimerRunning(true)}
                onPause={() => setTimerRunning(false)}
                onReset={() => setTimerRunning(false)}
                onDurationChange={handleDurationChange}
            />

            <Timer />
        </div>
    );
};

export default Meditation;
