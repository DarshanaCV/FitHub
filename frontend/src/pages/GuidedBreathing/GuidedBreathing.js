import React from 'react';
import BoxBreathing from "../../components/BoxBreathing/BoxBreathing";
import './GuidedBreathing.css';

const GuidedBreathing = () => {
    const [text, setText] = React.useState("start");
    const [startBreathing, setStartBreathing] = React.useState(false);
    const [startProgress,setStartProgress]=React.useState(false)
    const [countdown,setCountdown]=React.useState(6)

    //for the countdown
    React.useEffect(() => {
        let interval;

        if (startBreathing && countdown === 0) {
            interval = setInterval(() => {
                setStartProgress(!startProgress);
            }, 100);
        } 
        else if (startBreathing && countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000); // Decrease countdown every second
        }

        // Clear the interval only when the pause button is clicked
        if (!startBreathing) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [startBreathing, countdown]);

    const toggleText = () => {
        if (text === "start") {
            setStartBreathing(true);
            setText("pause");
        } else if (text === "pause") {
            setStartBreathing(false);
            setStartProgress(false)
            setText("start");
        }
    };

    return (
        <div className="guided-breathing-container">
            <BoxBreathing startBreathing={startBreathing} />
            <button onClick={toggleText} className='btn-text'>{text}</button>
            <div className="rectangle"><div className={`${startProgress? 'rectangle-child' : '' }`}></div> </div>
            <p className="progress">progress<br/>(10 mins)</p>
        </div>
    );
}

export default GuidedBreathing;
