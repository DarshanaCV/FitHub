import './App.css'
import React from 'react';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup';
import Yoga from './pages/Yoga/Yoga';
import Meditation from './pages/Meditation/Meditation';
import GuidedBreathing from './pages/GuidedBreathing/GuidedBreathing';
import GuidedBreathingContainer from './pages/GuidedBreathing/GuidedBreathingContainer';
import BreakFromStress from './components/BreakFromStress/BreakFromStress';
const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/yoga' element={<Yoga/>}></Route>
                <Route path='/meditate' element={<Meditation/>}></Route>
                <Route path='/guided-breathing' element={<GuidedBreathing/>}></Route>
                <Route path='/guided-breathing-page' element={<GuidedBreathingContainer/>}></Route>
                <Route path='/break-from-stress' element={<BreakFromStress/>}></Route>
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default App;
