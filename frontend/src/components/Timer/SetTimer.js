import React, { useContext } from 'react'
import Button from './Button'
import '../../pages/Meditation/Meditation.css'
import { SettingContext } from '../../context/SettingsContext'
const SetTimer=()=>{

    const {updateExecute}=useContext(SettingContext)
    const [newTimer,setNewTimer]=React.useState({
        meditate:0.3,
        short:0.2,
        long:1,
        active:'meditate'
    })
    const handleChange=(e)=>{
        switch(e.target.name){
            case 'meditate':
                setNewTimer({
                    ...newTimer,
                    meditate:parseFloat(e.target.value)
                })
                break

            case 'short':
                setNewTimer({
                    ...newTimer,
                    short:parseFloat(e.target.value),
                    active:'shortBreak'
                })
                break

            case 'long':
                setNewTimer({
                    ...newTimer,
                    long:parseFloat(e.target.value),
                    active:'longBreak'
                })
                break
            default:
                break
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        updateExecute(newTimer)
    }

    return(
        <div className='timer-container'>
            <form noValidate>
                <div className='input-wrapper'>
                    <input type='number' name="meditate" onChange={handleChange} value={newTimer.meditate} />
                    <input type='number' name="short" onChange={handleChange} value={newTimer.short} />
                    <input type='number' name="long" onChange={handleChange} value={newTimer.long} />
                </div>
                <button type="submit" onClick={handleSubmit}>Set Timer</button>              
            </form>

        </div>
    )
}

export default SetTimer