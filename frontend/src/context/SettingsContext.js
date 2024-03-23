import React, {createContext } from 'react'
export const SettingContext=createContext()

const SettingsContextProvider=(props)=>{

    const [meditate,setMeditate]=React.useState(0)
    const [executing,setExecuting] =React.useState({})
    const [isPlaying,setIsPlaying]=React.useState(false)

    const startTimer=()=>{
        setIsPlaying(true)
        console.log(isPlaying)
    }

    const pauseTimer=()=>{
        setIsPlaying(false)
    }

    const stopTimer=()=>{
        setIsPlaying(false)
    }

    const SettingBtn=()=>{
        setExecuting({})
        setMeditate(0)
    }

     const setCurrentTimer=(active_state)=>{
        updateExecute({
            ...executing,
            active:active_state
        })
        setTimerTime(executing)
    }

    const updateExecute = updatedSettings=>{
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
    }

    const setTimerTime=evaluate=>{
        switch (evaluate.active) {
            case 'meditate':
                setMeditate(evaluate.meditate)
                break;
            case 'short':
                setMeditate(evaluate.short)
                break;
            case 'long':
                setMeditate(evaluate.long)
                break;
            default:
                setMeditate(0)
                break;
        }
    }

    const children=({remainingTime})=>{
        const minutes=Math.floor(remainingTime / 60)
        const seconds=remainingTime%60
        return `${minutes}:${seconds}`
    }

    return(
        <SettingContext.Provider 
            value={{
                stopTimer,
                updateExecute,
                meditate,
                executing,
                isPlaying,
                startTimer,
                pauseTimer,
                SettingBtn,
                setCurrentTimer,
                updateExecute,
                children
            }}>
            {props.children}
        </SettingContext.Provider>
    )
}
export default SettingsContextProvider