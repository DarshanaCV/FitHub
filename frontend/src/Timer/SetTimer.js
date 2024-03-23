import Button from "./Button"
import React from 'react'
const SetTimer=()=>{

    const [newTimer,setNewTimer]=React.useState({time:0.3,break:0.2,active:'work'})
    const handleChange=input =>{
        const {name,value}=input.target
        switch(name){
            case 'work':
                setNewTimer({...newTimer,work:parseInt(value)})
                break;

            case 'break':
                setNewTimer({...newTimer,break:parseInt(value)})
                break;

            default:
                break;
        }
        console.log(newTimer);
    }

    const handleSubmit=()=>{
        
    }
    return(

        <div className="form-container">
            <form noValidate>
                <div className="input-wrapper">
                    <input type="" className="timer-input" name="time" onChange={handleChange} value={2}/>
                    <input type="" className="timer-input" name="break" onChange={handleChange} value={2}/>
                </div>
                <Button title="set timer" _callback={handleSubmit} />
            </form>
        </div>
    )
}

export default SetTimer