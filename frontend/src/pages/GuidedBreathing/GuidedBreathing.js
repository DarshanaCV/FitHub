import React from 'react';
import BoxBreathing from "../../components/BoxBreathing/BoxBreathing";
import { useNavigate } from "react-router-dom";
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

        if (progressTime >= 10) {
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
        // const currentDate = new Date().toISOString().split('T')[0];
        const currentDate="2024-04-16"
        const userRef=ref(database,`/users/${id}`)

        get(userRef)
        .then((snapshot)=>{
            const userData=snapshot.val()
            const lastObjectNumber=parseInt(Object.keys(userData.streaks.boxBreathingstreak).pop())
            const lastModifiedData=(userData.streaks.boxBreathingstreak[lastObjectNumber])
            const oldKey=String(lastObjectNumber)
            const newKey=String(lastObjectNumber+1)
            console.log(lastModifiedData.date);
            console.log(lastModifiedData.count);
            console.log(lastObjectNumber);
            //update the existing count
            if(userData.streaks.boxBreathingstreak[lastObjectNumber].date===currentDate){
                const newData={
                    ...userData,
                    streaks:{
                        boxBreathingstreak:{
                            ...userData.streaks.boxBreathingstreak,
                            [oldKey]:{
                                date:`${currentDate}`,
                                count:lastModifiedData.count+1
                            }
                        }
                    }
                }
                update(userRef,newData)
                .then(()=>{
                    console.log("updated the count successfully");
                })
                .catch((error)=>{
                    console.error(error);
                })
            }
            //create a new date
            else if(currentDate!==userData.streaks.boxBreathingstreak[lastObjectNumber].date){
                const newData={
                    ...userData,
                    streaks:{
                        boxBreathingstreak:{
                            ...userData.streaks.boxBreathingstreak,
                            [newKey]:{
                                date:currentDate,
                                count:1
                            }
                        }
                    }
                }
                update(userRef,newData)
                .then(()=>{
                    console.log("new date added successfully");
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