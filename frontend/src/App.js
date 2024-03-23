import './App.css'
import React from 'react';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup';
import Yoga from './pages/Yoga/Yoga';
import Meditation from './pages/Meditation/Meditation';

const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/yoga' element={<Yoga/>}></Route>
                <Route path='/meditate' element={<Meditation/>}></Route>
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default App;
