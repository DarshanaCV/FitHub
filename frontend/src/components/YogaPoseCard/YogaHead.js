import React, { useState, useEffect} from "react";
import { auth, database } from '../../firebase_setup/firebase';
import { ref, onValue } from 'firebase/database';
import '../../pages/Yoga/Yoga';

const YogaHead = () => {
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

    return (
        <div className="yoga-head-container">
            <div className="yoga-head-info">
                <h2>Hello, {displayName}</h2>
                <div className="yoga-head-info-heading">
                    <h1>Balance,</h1><br/>
                    <h1 className="mind">Mind & Body</h1>
                </div>
                <p>Experience a calm mind, reduce anxiety, increased energy levels, and<br/>sustainable happiness everyday.</p>
                <button>Learn more</button>
            </div>
            <img src="./media/yoga/1.png" alt="Yoga"></img>
        </div>
    );
}

export default YogaHead;
