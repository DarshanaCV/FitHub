import React, { useState, useEffect } from 'react';
import { database } from '../../firebase_setup/firebase';
import { get, ref, push } from 'firebase/database';
import './GratitudeJournal.css'; // Import CSS file for styling

const GratitudeJournal = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = () => {
        const userId = localStorage.getItem("uid");
        const userRef = ref(database, `users/${userId}/gratitudeJournal`);

        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const entriesArray = Object.values(snapshot.val()).reverse();
                    const lastFiveEntries = entriesArray.slice(0, 3);
                    setEntries(lastFiveEntries);
                } else {
                    setEntries([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching gratitude journal entries:', error);
            });
    };

    const handleSubmit = () => {
        const userId = localStorage.getItem("uid");
        const currentDate = new Date().toISOString().split('T')[0];
        const entryData = { date: currentDate, content: entry };
        const userRef = ref(database, `users/${userId}/gratitudeJournal`);
        if(entry !== "") {
            push(userRef, entryData)
                .then(() => {
                    console.log('Gratitude entry added successfully');
                    setEntry('');
                    fetchEntries();
                })
                .catch((error) => {
                    console.error('Error adding gratitude entry:', error);
                });
        } else {
            window.alert("Entry cannot be empty");
        }
    };

    return (
        <div className="gratitude-journal-container">
            <h3>Gratitude Journal</h3>
            <div></div>
            <textarea
                rows="5"
                placeholder="Write down what you're grateful for today..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit} className='journal-btn'>Add Entry</button>
            <div className="journal-entries">
                <h3>Past Entries</h3>
                <ul>
                    {entries.map((entry, index) => (
                        <li key={index} className='gratitude-entry'>{entry.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GratitudeJournal;
