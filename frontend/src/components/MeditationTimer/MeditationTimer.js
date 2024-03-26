import React, { useState, useEffect, useRef } from 'react';
import './MeditationTimer.css'; // Import your CSS file for styling

const MeditationTimer = ({ duration, timerRunning, onStart, onPause, onReset, onDurationChange }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [initialOffset, setInitialOffset] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            onPause();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
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
    setTimeRemaining(duration);
  };

  const handlePause = () => {
    onPause();
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    onReset();
    clearInterval(intervalRef.current);
    setTimeRemaining(duration);
  };

  return (
    <div className="meditation-timer">

      <div className='meditation-timer-input'> 
        <label>
            Set Duration in seconds
            <input type="number" value={duration} onChange={e => onDurationChange(parseInt(e.target.value))} disabled={timerRunning} />
        </label>
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
                    style={{  strokeDasharray: `${initialOffset}`,
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
          <button onClick={handleStart} disabled={timerRunning}>Start</button>
          <button onClick={handlePause} disabled={!timerRunning}>Pause</button>
          <button onClick={handleReset}>Reset</button>
      </div>
      
    </div>
  );
};

export default MeditationTimer;
