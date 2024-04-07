import React, { useState, useEffect, useContext} from "react";
import { auth, database } from '../../firebase_setup/firebase';
import { ref, onValue, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom'
import '../../pages/Meditation/Meditation.css';
import { NavLink } from "react-router-dom";

const Meditation = () => {

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

    const scrollToBottom = () => {
        const bottomElementRef = document.getElementById('bottom');
        bottomElementRef.scrollIntoView({ behavior: 'smooth' });
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
                    <button onClick={scrollToBottom}>Get started</button>
                </div>
                <img src="./media/meditate/guided-breathing.png" alt="meditate"/>
            </div>
            
            <div className="box-container"  id="bottom">
                <div className="box meditate-in-nature">
                    <img src="./media/meditate/meditation-for-self-love.png" alt="guided-breathing" />
                    <div className="inner-box">
                        <h1>Guided breathing</h1>
                        <p>Explore the transformative practice of guided breathing, featuring the proven effectiveness
                            of the Box Breathing technique. With its structured approach, inhale, hold, exhale, and hold phases, 
                            this method fosters deep relaxation, stress reduction, and heightened mindfulness, empowering you to 
                            cultivate inner peace and balance.</p>
                        <NavLink  to="/guided-breathing-page" >
                            <button>start</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="box-container">
                <div className="box find-inner-piece">
                    <div className="inner-box">
                        <h1>Custom meditation</h1>
                        <p>Indulge in a tailored meditation experience with our customizable timer, seamlessly 
                            integrated with serene background music and tranquil video visuals. Elevate your 
                            practice with personalized settings, empowering you to find stillness, focus, and 
                            rejuvenation amidst the harmonious blend of audio and visual elements.</p>
                        <NavLink  to="/custom-meditate" >
                            <button>start</button>
                        </NavLink>
                    </div>
                    <img src="./media/meditate/find-inner-piece.png" alt="custom-meditate" />
                </div>
            </div>
            
        </div>
    );
};

export default Meditation;
