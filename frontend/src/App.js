import './App.css'
import React from 'react';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup';
import Yoga from './pages/Yoga/Yoga';
import Meditation from './pages/Meditation/Meditation';
import GuidedBreathing from './components/GuidedBreathing/GuidedBreathing';

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
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default App;
