import {NavLink} from "react-router-dom"
import "./Footer.css"

const Footer=()=>{
    return(
        <div className="footer-container">
            <div className="footer-left-side">
                <div className="footer-left-heading">
                    <NavLink to="/" className="logo">
                        <img src="./media/logo1.png" alt="logo"/>
                    </NavLink>
                    <h1>FitHub</h1>
                </div>
                <div className="footer-left">
                    <div className="footer-left-navs">
                        <NavLink to="/" className="item">Home</NavLink>
                        <NavLink to="/yoga" className="item">Yoga Poses</NavLink>
                        <NavLink to="/guided-breathing" className="item">Guided Breathing</NavLink>
                        <NavLink to="/meditate" className="item">Meditation</NavLink>
                        <NavLink to="/reports" className="item">Reports</NavLink>
                        <NavLink to="/" className="item">Contact us</NavLink>
                    </div>
                    <p>© 2024 FitHub. All rights reserved.</p>
                </div>  
            </div>
            <div className="footer-right">
                <div className="footer-right-side">
                    <img src="./media/footer/instagram.png" alt="instagram"/>
                    <img src="./media/footer/gmail.png" alt="gmail"/>
                    <img src="./media/footer/telegram.png"alt="telegram" />
                    <img src="./media/footer/github.png" alt="github"/>
                </div>
                <p>Support: darshana.vaghela@somaiya.edu</p>
            </div>
        </div>
    )
}
export default Footer