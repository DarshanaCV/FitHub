import React, { useState, useEffect, useRef } from 'react';

  const MeditationTimer =({ duration, timerRunning, onStart, onPause, onReset, onDurationChange })  => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
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

  const formatTime = (time) => {
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
    <div>
      <label>
        Set Duration (seconds):
        <input
          type="number"
          value={duration}
          onChange={(e) => onDurationChange(parseInt(e.target.value))} 
          disabled={timerRunning}
        />
      </label>
      <div>Time Remaining: {formatTime(timeRemaining)}</div>
      <button onClick={handleStart} disabled={timerRunning}>
        Start
      </button>
      <button onClick={handlePause} disabled={!timerRunning}>
        Pause
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default MeditationTimer;
