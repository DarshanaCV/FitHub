import React, { useState, useEffect } from 'react'
import './BoxBreathing.css'

const squareSize=403
const animationDuration=4000
const xpos=550
const ypos=145

const breatheInSound=require('./sound/breathe-in (mp3cut.net).mp3')
const breatheOutSound=require('./sound/breathe-out (mp3cut.net).mp3')

function BoxBreathing({ startBreathing }) {
    const [position,setPosition]=useState({x: xpos,y: ypos})
    const [startTime,setStartTime]=useState(0)
    const [elapsedTime,setElapsedTime]=useState(0)
    const [sideIndex,setSideIndex]=useState(0)
    const [text,setText]=useState("")
    const [zoomIn,setZoomIn]=useState(false)
    const [countdown,setCountdown]=useState(5)

    const sides=['top','right','bottom','left']

    //for the countdown
    useEffect(()=>{
        if(startBreathing && countdown>0){
            const countdownInterval=setInterval(()=>{
                setCountdown((prev)=>prev-1)
            },1000)

            return ()=>clearInterval(countdownInterval)
        }
    },[startBreathing,countdown])

    //to start animation after countdown
    useEffect(()=>{
        if(countdown===0){
            setStartTime(Date.now())
        }
    },[countdown])

    //to keep the audio in sync with breathein and breathe out
    useEffect(()=>{
        if(startBreathing && text){
            if(text==="Breathe in"){
                const audioElement=document.getElementById('breatheInAudio')
                audioElement.currentTime=0
                audioElement.play()
                document.getElementById('breatheOutAudio').pause()
            } 
            else if(text==="Breathe out"){
                const audioElement=document.getElementById('breatheOutAudio')
                audioElement.currentTime=0
                audioElement.play()
                document.getElementById('breatheInAudio').pause()
            }
        }
    },[startBreathing,text])

    //to make the dot moving
    useEffect(()=>{
        const interval=setInterval(()=>{
            if(startBreathing && countdown===0){
                updatePosition()
            }
        },10)
        return ()=>clearInterval(interval)
    },[startBreathing,countdown,sideIndex,startTime])

    //updates the position of dot to make it move along the square
    const updatePosition=()=>{
        const currentTime=Date.now()
        const deltaTime=currentTime-startTime

        if(deltaTime>=animationDuration){
            setSideIndex((sideIndex+1)%4)
            setStartTime(currentTime)
        }

        const progress=Math.min(1,deltaTime/animationDuration)
        let newPosition

        switch(sides[sideIndex]){
            case 'top':
                newPosition={x: xpos+progress*squareSize, y: ypos}
                setText("Breathe in")
                setZoomIn(true)
                break
            case 'right':
                newPosition={x: xpos+squareSize, y: ypos+progress*squareSize}
                setText("Hold")
                setZoomIn(true)
                break
            case 'bottom':
                newPosition={x: xpos+(1-progress)*squareSize, y: ypos+squareSize}
                setText("Breathe out")
                setZoomIn(false)
                break
            case 'left':
                newPosition={x: xpos, y: ypos+(1-progress)*squareSize}
                setText("Hold")
                setZoomIn(false)
                break
            default:
                break
        }

        setPosition(newPosition)
        setElapsedTime(deltaTime)
    }

    return (
        <>
            {startBreathing && countdown>0 && <h2 className="countdown">Starting in {countdown}</h2>}
            <div className="box-breathing-container">
                <div className="square">
                    <audio id="breatheInAudio" src={breatheInSound} />
                    <audio id="breatheOutAudio" src={breatheOutSound} />
                    <div className="inner-circle">
                        <div className={`circle1 ${zoomIn ? 'zoom-in' : ''}`}>
                            <div className={`circle2 ${zoomIn ? 'zoom-in-circle' : ''}`}>
                                <p className={`text ${zoomIn ? 'zoom-in' : ''}`}>{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dot" style={{ left: position.x, top: position.y }}></div>
            </div>
        </>
    );
}

export default BoxBreathing;
