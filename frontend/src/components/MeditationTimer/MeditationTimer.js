import React, { useState, useEffect, useRef } from 'react';
import { faArrowRotateRight, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MeditationTimer.css';
const alarmSound = require("./alarm/alarm1.mp3");

const MeditationTimer = ({ duration, timerRunning, onStart, onPause, onReset, onDurationChange }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [initialOffset, setInitialOffset] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(alarmSound));

  useEffect(() => {
    const audioElement = audioRef.current;
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            onPause();
            return 0;
          }
          if (prevTime === 4) {
            audioElement.play();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, [timerRunning, onPause]);

  useEffect(() => {
    const progressCircle = document.getElementById('progress-circle');
    if (progressCircle) {
      const circumference = 2 * Math.PI * (progressCircle.getAttribute('r') || 0);
      setInitialOffset(circumference);
    }
  }, []);

  useEffect(() => {
    const progress = timeRemaining / duration;
    const progressCircle = document.getElementById('progress-circle');
    if (progressCircle) {
      const circumference = 2 * Math.PI * (progressCircle.getAttribute('r') || 0);
      const offset = progress <= 0 ? initialOffset : circumference * (1 - progress);
      progressCircle.style.strokeDashoffset = offset >= 0 ? offset : 0;
    }
  }, [timeRemaining, duration, initialOffset]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    onStart();
    setTimeRemaining(timeRemaining);
  };

  const handlePause = () => {
    onPause();
  };

  const handleReset = () => {
    onReset();
    clearInterval(intervalRef.current);
    setTimeRemaining(duration);
  };

  return (
    <div className="meditation-timer">
      <div className='meditation-timer-input'>
        <p>Set Duration in seconds</p>
        <input type="number" value={duration} onChange={e => onDurationChange(parseInt(e.target.value))} disabled={timerRunning} />
      </div>

      <div className="circle">
        <svg className="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle className="progress-ring" cx="50" cy="50" r="45" />
          <circle
            id="progress-circle"
            className="progress-circle"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDasharray: `${initialOffset}`,
              strokeDashoffset: `${initialOffset}`,
              transform: 'rotate(-90deg)'
            }}
          />
          <text x="50%" y="55" textAnchor="middle" dominantBaseline="central" className="timer-display">
            {formatTime(timeRemaining)}
          </text>
        </svg>
      </div>

      <div className='meditation-timer-settings'>
        <FontAwesomeIcon icon={faPlay} onClick={handleStart} className="buttons" />
        <FontAwesomeIcon icon={faPause} onClick={handlePause} className="buttons" />
        <FontAwesomeIcon icon={faArrowRotateRight} onClick={handleReset} className="buttons" />
      </div>

    </div>
  );
};

export default MeditationTimer;
