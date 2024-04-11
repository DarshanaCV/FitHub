import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./YogaPoseInfo.css";
import { database, auth } from '../../firebase_setup/firebase';
import { get, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Goddess = () => {
    const [bestTime, setBestTime] = useState(0);
    const [time, setTime] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            navigate("/signup");
        }
    }, []);

    const getBestTime = (userId) => {
        const id = userId;
        const currentDate = new Date().toISOString().split('T')[0];
        const userRef = ref(database, `/users/${id}`);
        get(userRef)
            .then((snapshot) => {
                const userData = snapshot.val();
                const goddess_data = userData?.yogaBestTime?.goddess || {};
                let maxBestTime = -Infinity;
                for (const date in goddess_data) {
                    if (goddess_data[date] > maxBestTime) {
                        maxBestTime = goddess_data[date];
                    }
                }
                setBestTime(maxBestTime);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const updateBestTime = (userId, newTime) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const userRef = ref(database, `/users/${userId}`);
    get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            let newBestTime = { ...userData.yogaBestTime.goddess };
            console.log(newBestTime);
            if (!newBestTime[currentDate] || newTime < newBestTime[currentDate]) {
                newBestTime[currentDate] = newTime;
            }
            const newData = {
                ...userData,
                yogaBestTime: {
                    ...userData.yogaBestTime,
                    goddess: newBestTime,
                },
            };
            update(userRef, newData)
                .then(() => {
                    console.log("Yoga best time updated successfully");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getBestTime(user.uid);
            } else {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleButtonClick = async () => {
        const modelName = "goddess_pose";
        try {
            const result = await axios.post('http://localhost:5000/run-model', { modelName });
            setTime(result.data.best_time);
            updateBestTime(auth.currentUser.uid, result.data.best_time);
        } catch (error) {
            console.error('Error sending request to Flask:', error.message);
        }
    };

    return (
        <div className="tree-container">
            <div className="tree-head">
                <div className="tree-head-left">
                    <h1>Goddess Pose</h1>
                    <p>Utkata Konasana</p>
                    <button onClick={handleButtonClick}>Get Started</button>
                </div>
                <div className="tree-head-right">
                    <p>Level: Intermediate</p>
                    <p>Pronunciation:<br/>( Utkata: "Oot-kah-tah" <br/>Konasana: "Koh-nah-sah-nah)</p>
                    <p>Best time: {bestTime}s</p>
                </div>
            </div>
            <div className="tree-video">
                <video height="500px" width="680px" autoPlay loop muted>
                    <source src="\media\yoga\goddess.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="tree-instructions">
                <p>
                    The Goddess Pose, or "Utkata Konasana" in Sanskrit, is a powerful yoga pose that strengthens the lower body, opens the hips, and improves balance. Here's how to do it:<br />
                    1. Starting Position: Begin standing tall at the top of your mat with your feet about 3-4 feet apart, toes pointing out at a 45-degree angle. Keep your arms by your sides, palms facing forward.<br />
                    2. Engage Core: Engage your core muscles by drawing your navel in toward your spine. This will help stabilize your torso throughout the pose.<br />
                    3. Bend Your Knees: Bend your knees deeply, sinking your hips down toward the level of your knees. Keep your knees tracking in line with your toes; don't let them collapse inward or push too far past your toes.<br />
                    4. Arms Positioning: Bring your arms out to the sides at shoulder height, bending your elbows to form a cactus shape with your arms. Your palms can either face forward or be turned to face each other, whichever feels more comfortable for you.<br />
                    5. Torso Position: Keep your torso upright, with your spine lengthened and your chest lifted. Try to avoid leaning forward or backward.<br />
                    6. Sink Deeper: If you're comfortable, sink deeper into the pose by lowering your hips a little more toward the level of your knees. Keep pressing down through your feet to maintain stability.<br />
                    7. Hold the Pose: Hold the Goddess Pose for several breaths, focusing on maintaining your alignment and feeling the strength and stability in your lower body.<br />
                    8. Release: To come out of the pose, straighten your legs and bring your arms back down by your sides.<br />
                    9. Repeat: You can repeat the Goddess Pose a few times, holding it for as long as feels comfortable for you.<br />
                </p>
            </div>
        </div>
    );
};

export default Goddess;
