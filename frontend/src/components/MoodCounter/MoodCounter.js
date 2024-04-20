import React, { useState, useEffect } from 'react';
import { database } from '../../firebase_setup/firebase';
import { get, ref, update } from 'firebase/database';
import './MoodCounter.css'; // Import CSS file for styling

const MoodCounter = () => {
    const [mood, setMood] = useState("");
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        getMood();
    }, []);

    const handleMoodChange = (newMood) => {
        setMood(newMood);
        updateMood(newMood);
    };

    const updateMood = (newMood) => {
        const userId = localStorage.getItem("uid");
        const userRef = ref(database, `users/${userId}`);
        const currentDate = new Date().toISOString().split('T')[0];
        // const currentDate="2024-04-21"

        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();
                const newData = {
                    dailyMood: {
                        ...userData.dailyMood,
                        [currentDate]: newMood
                    }
                };

                update(ref(database, `users/${userId}`), newData)
                    .then(() => {
                        console.log("Updated the mood");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getMood = () => {
        const userId = localStorage.getItem("uid");
        const userRef = ref(database, `users/${userId}`);
        const currentDate = new Date().toISOString().split('T')[0];
        // const currentDate="2024-04-21"
        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();
                const lastModifiedDate = Object.keys(userData.dailyMood).pop();
                const lastModifiedData = userData.dailyMood[lastModifiedDate];

                if (currentDate === lastModifiedDate) {
                    setMood(lastModifiedData);
                    setSelected(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='mood-container'>
            <h2>How are you feeling today?</h2>
            <div className='moods'>
                <button onClick={() => handleMoodChange('happy')} className={`mood ${mood === 'happy' ? 'selected-mood' : ''}`}>😊 Happy</button>
                <button onClick={() => handleMoodChange('sad')} className={`mood ${mood === 'sad' ? 'selected-mood' : ''}`}>😢 Sad</button>
                <button onClick={() => handleMoodChange('neutral')} className={`mood ${mood === 'neutral' ? 'selected-mood' : ''}`}>😐 Neutral</button>
            </div>
        </div>
    );
};

export default MoodCounter;
