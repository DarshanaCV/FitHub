import axios from 'axios';
import "./YogaPoseInfo.css"

const Tree=()=>{
    const handleButtonClick = async () => {
        const modelName="tree_pose"
        console.log("Button clicked:", modelName);
        try {
            const result = await axios.post('http://localhost:5000/run-model', { modelName });
            console.log(result);
            
        } catch (error) {
            console.error('Error sending request to Flask:', error.message);
        }
    };

    return(
        <div className="tree-container">
            <div className="tree-head">
                <div className="tree-head-left">
                    <h1>Tree Pose</h1>
                    <p>Vrikshasana</p>
                    <button onClick={handleButtonClick}>Get Started</button>
                </div>
                <div className="tree-head-right">
                    <p>level: Begineer</p>
                    <p>Pronounciation</p>
                    <p>(vrik-SHAHS-anna)</p>
                </div>
            </div>
            <div className="tree-video">
                <video height="500px" width="680px" autoPlay loop muted>
                    <source src="\media\yoga\tree.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="tree-instructions">
                <p>
                    Tree pose, also known as Vrksasana in Sanskrit, is a foundational yoga pose that helps improve balance, focus, and concentration. Here's how you can do the Tree pose:<br/>
                    1. Start by standing tall in Mountain pose (Tadasana) with your feet hip-width apart and your arms at your sides.<br/>
                    2. Shift your weight onto your left foot and lift your right foot off the ground.<br/>
                    3. Bend your right knee and use your right hand to bring your right foot to your left inner thigh. You can place your foot on your calf or ankle if bringing it to the thigh is challenging.<br/>
                    4. Press your right foot into your inner thigh while gently pressing your thigh back into your foot. Avoid placing your foot directly on your knee joint to prevent strain.<br/>
                    5. Engage your core muscles and lengthen your spine. You can place your hands in prayer position at your heart center (Anjali Mudra) or extend your arms overhead, palms facing each other.<br/>
                    6. Find a focal point in front of you to help with balance and concentration.<br/>
                    7. Hold the pose for several breaths, maintaining steady breathing. If you feel stable, you can experiment with gently swaying your arms or slowly raising them overhead.<br/>
                    8. To release the pose, lower your right foot down and return to Mountain pose. Repeat on the other side by shifting your weight to your right foot and lifting your left foot.<br/>
                </p>
                
            </div>
        </div>
    )
}

export default Tree