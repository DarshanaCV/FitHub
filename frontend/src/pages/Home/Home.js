import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import MoodCounter from "../../components/MoodCounter/MoodCounter";
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

    
    const DailyQuotes = () => {
    const [quote, setQuote] = React.useState('');

    React.useEffect(() => {
        // Function to retrieve a random quote (replace with your logic)
        const getRandomQuote = () => {
        const quotes = [
            "The only way to do great work is to love what you do. – Steve Jobs",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "It does not matter how slowly you go as long as you do not stop. – Confucius",
            "Health is a state of complete harmony of the body, mind, and spirit. When one is free from physical disabilities and mental distractions, the gates of the soul open. - B.K.S. Iyengar",
            "The greatest wealth is health. - Virgil",
            "Take care of your body. It's the only place you have to live. - Jim Rohn",
            "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear. - Buddha",
            "Physical fitness is not only one of the most important keys to a healthy body, but it is also the basis of dynamic and creative intellectual activity. - John F. Kennedy",
            "The only way to keep your health is to eat what you don't want, drink what you don't like, and do what you'd rather not. - Mark Twain",
            "Happiness is the highest form of health. - Dalai Lama",
            "He who has health has hope, and he who has hope has everything. - Arabian Proverb",
            "Your body hears everything your mind says. Stay positive. - Unknown",
            "Life is not merely being alive, but being well. - Marcus Valerius Martialis",
            "The secret of health for both mind and body is not to mourn for the past, worry about the future, or anticipate troubles, but to live in the present moment wisely and earnestly. - Buddha",
            "Health is not simply the absence of sickness. - Hannah Green",
            "The first wealth is health. - Ralph Waldo Emerson",
            "A healthy outside starts from the inside. - Robert Urich",
            "The groundwork of all happiness is health. - Leigh Hunt"
        ];
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
        };

        setQuote(getRandomQuote());
    }, []);

    return (
        <div className="motivational-quote">
        <h4>Daily Motivation:</h4>
        <p>{quote}</p>
        </div>
    );
};

    return (
        <div className="home-component">
            <div className="left-home-container">
                <div className="left-home-container-heading">
                    <h2>Welcome, {displayName}</h2>
                    {DailyQuotes()}
                </div>
                <div className="left-container-img">
                    <div className="left-container-img-info">
                        <p>
                            Join FitHub for an immersive experience in yoga and 
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
