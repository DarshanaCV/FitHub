import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MeditationTimer from "../MeditationTimer/MeditationTimer";
import SelectMusic from '../SelectMusic/SelectMusic';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components.css";


const CustomMeditate = () => {
    const [sessionDuration, setSessionDuration] = React.useState(60);
    const [timerRunning, setTimerRunning] = React.useState(false);
    const [selectMusic, setSelectMusic] = React.useState(false);
    const [backgroundVideo, setBackgroundVideo] = React.useState(null);
    const navigate = useNavigate();
    const videoRef = useRef(null);

    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if (!userToken) {
            navigate("/signup");
        }
    }, []);

    const handleDurationChange = (newDuration) => {
        setSessionDuration(newDuration);
    };

    const toggleSelectMusic = () => {
        setSelectMusic(!selectMusic);
    };

    const handleMusicChange = (musicId,videoSrc) => {
        if (musicId=="music9") {
            setBackgroundVideo(null);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        } else {
            setBackgroundVideo(videoSrc);
            if (videoRef.current) {
                videoRef.current.src = videoSrc; 
                videoRef.current.play();
            }
        }
    };

    return (
        <div className="custom-meditate-container">
            {backgroundVideo && (
                <video
                    className="background-video"
                    id="backgroundVideo"
                    autoPlay
                    loop
                    muted
                    ref={videoRef}
                    onCanPlayThrough={() => {
                        videoRef.current.play();
                    }}
                >
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video element.
                </video>
            )}
            <div className='select-music'>
                <FontAwesomeIcon icon={faBars} className='font-icons' onClick={toggleSelectMusic} />
                <SelectMusic activeClass={selectMusic} onMusicChange={handleMusicChange} />
            </div>
            <div className='timer-container'>
                <MeditationTimer
                    duration={sessionDuration}
                    timerRunning={timerRunning}
                    onStart={() => setTimerRunning(true)}
                    onPause={() => setTimerRunning(false)}
                    onReset={() => setTimerRunning(false)}
                    onDurationChange={handleDurationChange}
                />
            </div>
        </div>
    );
};

export default CustomMeditate;
