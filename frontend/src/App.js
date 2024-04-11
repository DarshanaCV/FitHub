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
import CustomMeditate from './components/CustomMeditate/CustomMeditate';
import Tree from './pages/YogaPoseInfo/Tree';
import Warrior from './pages/YogaPoseInfo/Warrior';
import Mountain from './pages/YogaPoseInfo/Mountain';
import Lunge from './pages/YogaPoseInfo/Lunge';
import Goddess from './pages/YogaPoseInfo/Goddess';
import Reports from './pages/Reports/Reports';
const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/yoga' element={<Yoga/>}></Route>
                <Route path='/tree' element={<Tree/>}></Route>
                <Route path='/warrior' element={<Warrior/>}></Route>
                <Route path='/mountain' element={<Mountain/>}></Route>
                <Route path='/lunge' element={<Lunge/>}></Route>
                <Route path='/goddess' element={<Goddess/>}></Route>
                <Route path='/meditate' element={<Meditation/>}></Route>
                <Route path='/guided-breathing' element={<GuidedBreathing/>}></Route>
                <Route path='/guided-breathing-page' element={<GuidedBreathingContainer/>}></Route>
                <Route path='/custom-meditate' element={<CustomMeditate/>}></Route>
                <Route path='/reports' element={<Reports/>}></Route>
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default App;
