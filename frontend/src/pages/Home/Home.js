import React from "react";
import "./Home.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    React.useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        console.log("signed in");
        if(!userToken){
            navigate("/signup")
        }
    },[])

    const FirstSection = () =>{
        return (
            <div className="first-section">
                <div className="first-section-text">
                    <h3>Getting started with the Todo feature</h3>
                    <p>As a new user, you can easily start using the Todo feature without any technical knowledge. 
                        Once you've installed the app on your device, you can create and manage your tasks effortlessly.
                        Stay organized and never miss a deadline!</p>
                    <button>Learn More</button>
                </div>
                <p>insert image here</p>
            </div>
        )
    }
    const SecondSection = () =>{
        return (
            <div className="first-section grey">
                <div className="first-section-image">
                    <p>insert image here</p>
                </div>
                <div className="first-section-text">
                    <h3>The power of Todo and Notes</h3>
                    <p>Our app is designed to help you stay productive and organized. 
                        The Todo and Notes features are built on a secure and reliable platform,
                         ensuring that your tasks and important information are always accessible. 
                        Experience the convenience of managing your tasks and taking notes in one place.</p>
                    <button>Learn More</button>
                </div>
            </div>
        )
    }
    const ThirdSection = () =>{
        return (
            <div className="first-section ">
                <div className="first-section-text">
                    <h3>Boost your productivity with Todo</h3>
                    <p>Our app allows you to streamline your workflow by combining the power of Todo and Notes.
                        Say goodbye to scattered tasks and unorganized notes. 
                        With our app, you can easily prioritize your tasks, 
                        set reminders, and keep all your important information in one centralized location.</p>
                    <button>Learn More</button>
                </div>
                <div className="first-section-image">
                    <p>insert image here</p>
                </div>
            </div>
        )
    }
   

        return (
        <div className="home-component">
            <h1>How does the App work?</h1>
            <FirstSection />
            <SecondSection />
            <ThirdSection />
        </div>
        )}
export default Home