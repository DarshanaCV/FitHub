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
            

            <div className="box-container">
                <NavLink to="/guided-breathing-page" className="box guided-breathing">
                    <img src="./media/meditate/guided-breathing2.png" alt="guided-breathing" />
                    <p>Guided breathing</p>
                </NavLink>
                
                <NavLink to="/custom-meditate" className="box guided-breathing">
                    <img src="./media/meditate/meditation-for-self-love.png" alt="custom-meditate" />
                    <p>Custom Meditation</p>
                </NavLink>

                <NavLink to="/guided-breathing" className="box find-inner-piece">
                    <img src="./media/meditate/find-inner-piece.png" alt="find-inner-piece" />
                    <p>Find inner peace</p>
                </NavLink>

                <NavLink to="/guided-breathing" className="box break-from-stress">
                    <img src="./media/meditate/break-from-stress.png" alt="break-from-stress" />
                    <p>Break from stress</p>
                </NavLink>
                
                <NavLink className="box meditate-in-nature" to="/guided-breathing">
                    <img src="./media/meditate/break-from-stress2.png" alt="meditate-in-nature" />
                    <p>Meditate in nature</p>
                </NavLink>

            </div>
            
        </div>
    );
};

export default Meditation;
