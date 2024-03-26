import React, { useState, useEffect } from 'react';
import './GuidedBreathing.css';

const squareSize = 403; // Size of the square
const animationDuration = 4000;
const xpos = 550;
const ypos = 145;

const breatheInSound = require('./sound/breathe-in (mp3cut.net).mp3');
const breatheOutSound = require('./sound/breathe-out (mp3cut.net).mp3');

function GuidedBreathing() {
    const [position, setPosition] = useState({ x: xpos, y: ypos }); // Initial position of the dot
    const [startTime, setStartTime] = useState(Date.now()); // Start time of the current side animation
    const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time since the start of the current side animation
    const [sideIndex, setSideIndex] = useState(0); // Index of the current side
    const [text, setText] = useState(""); // Breathing instruction text
    const [zoomIn, setZoomIn] = useState(false); // Flag to control text zooming

    const sides = ['top', 'right', 'bottom', 'left']; // Order of sides

    useEffect(() => {
        const interval = setInterval(() => {
            updatePosition();
        }, 10); // Update dot position every 10 milliseconds

        return () => clearInterval(interval);
    }, [sideIndex]);

    useEffect(() => {
        // Play audio when "Breathe in" or "Breathe out" instruction occurs
        if (text === "Breathe in") {
            const audioElement = document.getElementById('breatheInAudio');
            audioElement.currentTime = 0; // Reset audio to the beginning
            audioElement.play();
            document.getElementById('breatheOutAudio').pause();
            console.log("breathe in");
        } else if (text === "Breathe out") {
            const audioElement = document.getElementById('breatheOutAudio');
            audioElement.currentTime = 0; // Reset audio to the beginning
            audioElement.play();
            document.getElementById('breatheInAudio').pause();
            console.log("breathe out");
        }
    }, [text]);


    const updatePosition = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - startTime;

        if (deltaTime >= animationDuration) {
            // Switch to the next side once the current side animation completes
            setSideIndex((sideIndex + 1) % 4);
            setStartTime(currentTime);
        }

        // Calculate the progress along the current side based on elapsed time
        const progress = Math.min(1, deltaTime / animationDuration);
        let newPosition;

        // Update dot position based on the current side
        switch (sides[sideIndex]) {
            case 'top':
                newPosition = { x: xpos + progress * squareSize, y: ypos };
                setText("Breathe in");
                setZoomIn(true);
                break;
            case 'right':
                newPosition = { x: xpos + squareSize, y: ypos + progress * squareSize };
                setText("Hold");
                setZoomIn(true);
                break;
            case 'bottom':
                newPosition = { x: xpos + (1 - progress) * squareSize, y: ypos + squareSize };
                setText("Breathe out");
                setZoomIn(false);
                break;
            case 'left':
                newPosition = { x: xpos, y: ypos + (1 - progress) * squareSize };
                setText("Hold");
                setZoomIn(false);
                break;
            default:
                break;
        }

        setPosition(newPosition);
        setElapsedTime(deltaTime);
    };

    return (
        <div className="guided-breathing-container">
            <div className="square">
                <audio id="breatheInAudio" src={breatheInSound} />
                <audio id="breatheOutAudio" src={breatheOutSound} />
                <div className="circle">
                    <div className={`circle1 ${zoomIn ? 'zoom-in' : ''}`}>
                        <div  className={`circle2 ${zoomIn ? 'zoom-in-circle' : ''}`}>
                            <p className={`text ${zoomIn ? 'zoom-in' : ''}`}>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dot" style={{ left: position.x, top: position.y }}></div>
        </div>
    );
}

export default GuidedBreathing;
