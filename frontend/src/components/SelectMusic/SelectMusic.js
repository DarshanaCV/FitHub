import React from 'react';
import { faCirclePlay,faCirclePause,faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components.css";

const music1=require("./meditation-music/music1.mp3")
const music2=require("./meditation-music/music2.mp3")
const music3=require("./meditation-music/music3.mp3")
const music4=require("./meditation-music/music4.mp3")
const music5=require("./meditation-music/music5.mp3")
const music6=require("./meditation-music/music6.mp3")
const music7=require("./meditation-music/music7.mp3")
const music8=require("./meditation-music/music8.mp3")

const video1 = require("./meditation-videos/music1.mp4");
const video2 = require("./meditation-videos/music2.mp4");
const video3 = require("./meditation-videos/music3.mp4");
const video4 = require("./meditation-videos/music4.mp4");
const video5 = require("./meditation-videos/music5.mp4");
const video6 = require("./meditation-videos/music6.mp4");
const video7 = require("./meditation-videos/music7.mp4");
const video8 = require("./meditation-videos/music8.mp4");

const SelectMusic = ({ activeClass , onMusicChange}) => {
    const [className, setClassName] = React.useState("unselect-music-container");
    const [music, setMusic] = React.useState("");
    const [musicPath, setMusicPath] = React.useState("");
    const [videoPath,setVideoPath] = React.useState("");
    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(() => {
        activeClass ? setClassName("select-music-container") : setClassName("unselect-music-container");
    }, [activeClass]);

    React.useEffect(() => {
        console.log("Selected music:", music);
        const audioElement = document.getElementById("musicPlayer");
        if (music === "music9") {
            audioElement.pause(); 
            setVideoPath("")
            setMusic("music9")
        } else if (music) {
            audioElement.src = musicPath;
            isPlaying ? audioElement.play() : audioElement.pause();
        }
        onMusicChange(music,videoPath);   
    }, [music, musicPath, isPlaying ]);

    const handleMusic = (musicId, musicSrc, videoSrc) => {
        setMusic(musicId);
        setMusicPath(musicSrc);
        setVideoPath(videoSrc)
        setIsPlaying(true); 
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={className}>
            
            <p className='music-heading'>Select Music</p> 
            <audio id="musicPlayer" autoPlay={false} loop>
                <source src={musicPath} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            <div className="music-container" onClick={() => handleMusic("music1", music1, video1)}>
                {music === "music1" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>positive energy</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music2", music2, video2)}>
                {music === "music2" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>startlight</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music3", music3, video3)}>
                {music === "music3" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>water mill</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music4", music4, video4)}>
                {music === "music4" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>unblock 7 chakras</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music5", music5, video5)}>
                {music === "music5" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>frequencies for sleep</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music6", music6, video6)}>
                {music === "music6" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>deep meditation</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music7", music7, video7)}>
                {music === "music7" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>220Hz meditation</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music8", music8, video8)}>
                {music === "music8" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>blessed</p>
            </div>
            <div className="music-container" onClick={() => handleMusic("music9", "", "")}>
                {music === "music9" 
                    ? 
                        (isPlaying ? 
                            <FontAwesomeIcon icon={faCirclePause} onClick={togglePlay} /> : 
                            <FontAwesomeIcon icon={faCirclePlay} onClick={togglePlay} />) 
                    : 
                        <FontAwesomeIcon icon={faCirclePlay} />}
                <p>none</p>
            </div>
        </div>
    );
};

export default SelectMusic;
