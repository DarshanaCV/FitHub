import React, { useState, useEffect, useContext} from "react";
import { auth, database } from '../../firebase_setup/firebase';
import { ref, onValue, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom'
import '../../pages/Meditation/Meditation.css';
import MeditationTimer from '../../components/MeditationTimer/MeditationTimer';
import SetTimer from "../../components/Timer/SetTimer";
import CountdownAnimation from '../../components/Timer/CountdownAnimation';
import { SettingContext } from "../../context/SettingsContext";
import Button from "../../components/Timer/Button"

const Meditation = () => {
    const [sessionDuration, setSessionDuration] = useState(10);
    const [timerRunning, setTimerRunning] = useState(false);
    const [displayName, setDisplayName] = useState(null);
    const {
            stopTimer,
            meditate,
            executing,
            setCurrentTimer,
            SettingBtn,
            children,
            isPlaying,
            startTimer,
            pauseTimer,
            updateExecute,
            startAnimate
            }=useContext(SettingContext)

    useEffect(()=>updateExecute(executing),[executing,startAnimate])

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
            {/* <MeditationTimer
                duration={sessionDuration}
                timerRunning={timerRunning}
                onStart={() => setTimerRunning(true)}
                onPause={() => setTimerRunning(false)}
                onReset={() => setTimerRunning(false)}
                onDurationChange={handleDurationChange}
            /> */}
        <div className="meditate-timer-container">
            {meditate !== 0 ? 
                <>
                    <ul className="timer-labels">
                        <li>
                            <Button 
                                title="Meditate"
                                active={executing.active === "meditate" && "active-label"}
                                _callback={()=>setCurrentTimer('meditate')}
                            />
                        </li>

                        <li>
                            <Button 
                                title="Short Break"
                                active={executing.active === "short" && "active-label"}
                                _callback={()=>setCurrentTimer('short')}
                            />
                        </li>

                        <li>
                            <Button 
                                title="Long Break"
                                active={executing.active === "short" && "active-label"}
                                _callback={()=>setCurrentTimer('long')}
                            />
                        </li>
                    </ul>
                    <Button title="Settings" _callback={SettingBtn}/>
                    <div className="countdown-container">
                        <div className="countdown-wrapper">
                            <CountdownAnimation
                                key={meditate}
                                timer={meditate}
                                animate={isPlaying}
                            >
                                {children}
                            </CountdownAnimation>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <Button title="Start" className={isPlaying ? 'activeClass':undefined} _callback={startTimer}/>
                        <Button title="Pause" className={!isPlaying ? 'activeClass':undefined} _callback={pauseTimer}/>
                        <Button title="Stop" className={!isPlaying ? 'activeClass':undefined} _callback={stopTimer}/>
                    </div>
                </>
                 :
                <SetTimer/>
            }
        </div>
        </div>
    );
};

export default Meditation;
