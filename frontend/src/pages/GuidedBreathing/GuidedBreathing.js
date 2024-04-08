import React from 'react';
import BoxBreathing from "../../components/BoxBreathing/BoxBreathing";
import { NavLink,useNavigate } from "react-router-dom";
import {database,auth} from '../../firebase_setup/firebase';
import { get,ref, update} from "firebase/database"
import './GuidedBreathing.css';

const GuidedBreathing = () => {
    const [text, setText] = React.useState("start");
    const [startBreathing, setStartBreathing] = React.useState(false);
    const [startProgress,setStartProgress]=React.useState(false)
    const [countdown,setCountdown]=React.useState(6)
    const [progressTime,setProgressTime]=React.useState(0)
    const navigate = useNavigate();

    React.useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if(!userToken){
            navigate("/signup")
        }
    },[])

    //for the countdown
    React.useEffect(() => {
        let interval;

        if (startBreathing && countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } 
        else if (startBreathing && countdown === 0) {
            // console.log(progressTime);
            setStartProgress(true);
            interval = setInterval(() => {
                setProgressTime(prevTime => prevTime + 1);
            }, 1000);
        }

        if (progressTime >= 300) {
            console.log("saved to database");
            getData()
            clearInterval(interval);
            setStartBreathing(false);
            setProgressTime(0); 
            setStartProgress(false);
            setText("start"); 
        }

        return () => clearInterval(interval);
    }, [startBreathing, countdown, progressTime]);
   
    const getData=()=>{
        const id=auth.currentUser.reloadUserInfo.localId
        const currentDate = new Date().toISOString().split('T')[0];
        // const currentDate="2024-04-12"
        const userRef=ref(database,`/users/${id}`)

        get(userRef)
        .then((snapshot)=>{
            const userData=snapshot.val()
            if(userData.streaks){
                const lastModifiedDate=userData.streaks.boxBreathingStreak.date
                if(lastModifiedDate===currentDate && userData.streaks.boxBreathingStreak.streak==0){
                    const newData={
                    ...userData,
                    streaks:{
                        boxBreathingStreak:{
                            date:`${currentDate}`,
                            streak:1
                        }
                    }}
                    update(userRef,newData)
                    .then(()=>{
                        console.log("started new streak");
                    })
                    .catch((error=>{
                        console.error(error);
                    }))
                }
                else if(lastModifiedDate===currentDate){
                    const newData={
                    ...userData,
                    streaks:{
                        boxBreathingStreak:{
                            date:`${currentDate}`,
                            streak:userData.streaks.boxBreathingStreak.streak
                        }
                    }}
                    update(userRef,newData)
                    .then(()=>{
                        console.log("daily streak exists");
                    })
                    .catch((error=>{
                        console.error(error);
                    }))
                }
                else if(lastModifiedDate<currentDate){
                    if(Math.floor((new Date(currentDate) - new Date(lastModifiedDate)) / (1000 * 60 * 60 * 24))==1){
                        const newData={
                        ...userData,
                        streaks:{
                            boxBreathingStreak:{
                                date:`${currentDate}`,
                                streak:userData.streaks.boxBreathingStreak.streak+1
                            }
                        }}
                        update(userRef,newData)
                        .then(()=>{
                            console.log("daily streak updated successfully");
                        })
                        .catch((error=>{
                            console.error(error);
                        }))
                    }
                }
            }
            else{
                const newData={
                    ...userData,
                    streaks:{
                        boxBreathingStreak:{
                            date:`${currentDate}`,
                            streak:1
                        }
                    }
                }
                update(userRef,newData)
                .then(()=>{
                    console.log("new streak added successfully");
                })
                .catch((error)=>{
                    console.error(error);
                })
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const toggleText = () => {
        if (text === "start") {
            setStartBreathing(true);
            setProgressTime(0);
            setText("pause");
        } 
        else if (text === "pause") {
            setStartBreathing(false)
            setProgressTime(0) 
            setText("start")
            setStartProgress(false)
        }
    };

    return (
        <div className="guided-breathing-container">
            <BoxBreathing startBreathing={startBreathing} />
            <button onClick={toggleText} className='btn-text'>{text}</button>
            <div className="rectangle"><div className={`${startProgress? 'rectangle-child' : '' }`}></div> </div>
            <p className="progress">progress<br/>(5 mins)</p>

        </div>
    );
}

export default GuidedBreathing;
