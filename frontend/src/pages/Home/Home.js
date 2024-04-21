import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import MoodCounter from "../../components/MoodCounter/MoodCounter";
import DailyQuotes from "../../components/DailyQuotes/DailyQuotes";
import GratitudeJournal from "../../components/GratitideJournal/GratitudeJournal";
import { auth, database } from '../../firebase_setup/firebase';
import { ref, onValue } from 'firebase/database';
import "./Home.css";
import MonthlyGoals from "../../components/MonthlyGoals/MonthlyGoals";
const Home = () => {
    const [displayName, setDisplayName] = React.useState(null)

    React.useEffect(() => {
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
    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if (!userToken) {
            navigate("/signup");
        }
    }, []);


    return (
        <div className="home-component">
            <div className="left-home-container">
                <div className="left-home-container-heading">
                    <h2>Welcome, {displayName}</h2>
                    <DailyQuotes />
                </div>
                <div className="left-container-img">
                    <div className="left-container-img-info">
                        <p>
                            {/* FitHub revolutionizes yoga practice with real-time pose correction via computer vision, 
                            fostering mindfulness and physical well-being. Guided meditation sessions, progress tracking, 
                            and elevate users' holistic health journey. */}Join FitHub for an immersive experience in yoga and 
                            meditation, empowering you to reach your wellness goals.
                        </p>
                        <NavLink to="/yoga"><button className="button-getStarted">Let's Start</button></NavLink>
                    </div>
                    <img src="./media/bg3.png" />
                </div>
            </div>
            <div className="right-home-container">
                <div className="right-home-quotes">
                    <MonthlyGoals/>
                </div>
                <div className="right-home-mood">
                    <MoodCounter />
                </div>
                <div className="right-home-gratitude">
                    <GratitudeJournal/>
                </div>
            </div>
        </div>
    );
};

export default Home;
