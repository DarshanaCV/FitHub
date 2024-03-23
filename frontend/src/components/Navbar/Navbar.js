import {NavLink} from "react-router-dom"
import {auth} from "../../firebase_setup/firebase"
import { useNavigate } from 'react-router-dom';
import { faHome, faSquareCheck,faUserPlus,faArrowRightToBracket, faNoteSticky ,faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css"
const Navbar = () => {
    const navigate = useNavigate();

    const signOut=()=>{
        auth.signOut();
        localStorage.removeItem('userToken')
        console.log("user is signed out");
        navigate("/signup");
    }
    
    return (
        <nav className="nav-bar">
            <div className="navlink">
             <NavLink to="/" className="logo">
                <img src="./media/logo.png"/>
             </NavLink>
            </div>
            
            <div className="navlink">
                <FontAwesomeIcon className="fas" icon={faHome} />
                <NavLink to="/" className="navItem">Home</NavLink>
            </div>
            
            <div className="navlink">
                <FontAwesomeIcon className="fas" icon={faUserPlus} />
                <NavLink to="/signup" className="navItem">Signup</NavLink>
            </div>

            <div className="navlink">
                <FontAwesomeIcon className="fas" icon={faChildReaching} />
                <NavLink to="/yoga" className="navItem">Yoga</NavLink>
            </div>
            
            <div className="navlink logout" onClick={signOut}>
                <FontAwesomeIcon className="fas" icon={faArrowRightToBracket} />
                <span className="navItem">Log out</span>
            </div>
  
        </nav>
    )
}

export default Navbar