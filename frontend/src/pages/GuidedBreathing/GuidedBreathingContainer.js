import React, { useState, useEffect } from 'react';
import { database, auth } from '../../firebase_setup/firebase';
import { get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import './GuidedBreathing.css';

const GuidedBreathingContainer = () => {
    const [streak, setStreak] = useState("0 Streak");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in, perform necessary operations
                getData(user.uid);
            } else {
                // User is signed out, handle accordingly (e.g., redirect to sign-in page)
                navigate("/signup");
            }
        });

        return () => unsubscribe(); // Clean up the listener when the component unmounts
    }, [navigate]);

    const getData = (userId) => {
        const userRef = ref(database, `/users/${userId}/streaks`);

        get(userRef)
            .then(snapshot => {
                const userData = snapshot.val();
                if (userData && userData.boxBreathingStreak && userData.boxBreathingStreak.streak) {
                    const userStreak = userData.boxBreathingStreak.streak;
                    setStreak(userStreak === 1 ? `${userStreak} Streak` : `${userStreak} Streaks`);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    const handleNavigate = () => {
        navigate('/guided-breathing');
    };

    return (
        <div className="box-breathing-container">
            <div className='streak'>
                <h1>Box Breathing</h1>
                <p>{streak}</p>
            </div>
            <div className="box-breathing-info-section1">
                    <p>Box breathing is a form of yogic deep breathing employed by the United States Navy SEALs 
                    and by stressed-out people everywhere. It’s also known as sama vritti pranayama, born of the 
                    yogic practice of pranayama, or focusing on the breath.<br/>
                    Its common name, “box breathing,” refers to the fact that a box has four sides, a concept 
                    represented here by breathing while you slowly count to four for a total of four times — 
                    four counts of breathing in, four counts of holding your breath, four counts of exhaling and 
                    four more counts of holding after your exhale.</p>
            </div>
            
            <div className='right'>
                {/* <img src="./media/meditate/guided-breathing/guided-breathing.gif" alt="Guided Breathing GIF" autoplay /> */}
                <video height="400px" width="680px" autoPlay loop muted>
                    <source src="\media\meditate\guided-breathing\guided-breathing.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="box-breathing-info-section2">
                <h1>Benefits of Box Breathing</h1>
                
                <h2>Lowers Stress</h2>
                <p>The biggest benefit of box breathing is relaxation, especially in times of stress. 
                Studies show that regulating your breath can lower levels of the stress hormone cortisol 
                and maybe even help lower blood pressure.</p><br/>

                <h2>Activates the parasympathetic nervous system</h2>
                <p>In times of stress, your sympathetic nervous system is on high alert. Box breathing can 
                help you move out of that state by tapping into the bodily system responsible for rest and 
                digestion — the parasympathetic nervous system. The parasympathetic nervous system is the 
                opposite of the sympathetic nervous system, otherwise known as “fight or flight.”<br/>
                When we’re anxious, we breathe shallowly and quickly, which actually creates more anxiety within your body.
                We can use breathwork to move out of the fight-or-flight state and into that parasympathetic nervous system.</p><br/>

                <h2>Calms the mind</h2>
                <p>You don’t have to be stressed to benefit from this breath exercise. Practicing box breathing is an 
                opportunity to bring mindfulness to your breath, which is a valuable practice even in tranquil times.<br/>
                It allows you to slow your breath, and it also has an aspect of meditation. As you’re breathing, you’re 
                also silently counting, which is a kind of mantra meditation that, again, calms the nervous system and
                brings you into the present moment.</p><br/>
            </div>

            <div className="box-breathing-info-section3">
                <p className="notes">
                <h4>*Streak Maintenance:</h4>
                Practice breathing exercises daily to maintain your streak. Consistency is key for progress.<br/>
                <h4>*Pause Reminder:</h4>
                Clicking "pause" restarts your session. Use it wisely, as it resets the timer and may affect your streak count if not completed in one go.
                Keep it up on your journey to mindfulness and well-being! </p>

                <button onClick={handleNavigate} className='start-box-breathing'> get started </button> 
            </div>
        </div>
    );
};

export default GuidedBreathingContainer;
