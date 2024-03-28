import React from 'react'
import { useNavigate } from 'react-router-dom';
import MeditationTimer from "../MeditationTimer/MeditationTimer"

const BreakFromStress=()=>{
    const [sessionDuration, setSessionDuration] = React.useState(10);
    const [timerRunning, setTimerRunning] = React.useState(false);

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

    return(
        <div>
            <MeditationTimer
                duration={sessionDuration}
                timerRunning={timerRunning}
                onStart={() => setTimerRunning(true)}
                onPause={() => setTimerRunning(false)}
                onReset={() => setTimerRunning(false)}
                onDurationChange={handleDurationChange}
            />
        </div>
    )
}

export default BreakFromStress