import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import "../components.css"
const MonthlyGoals = () => {
    const [goals, setGoals] = useState([]);
    const MAX_GOALS_PER_MONTH = 6; 

    useEffect(() => {
        // Load goals from storage when the component mounts
        const storedGoals = JSON.parse(localStorage.getItem('monthlyGoals')) || [];
        setGoals(storedGoals);
    }, []);

    const saveGoalsToStorage = (updatedGoals) => {
        localStorage.setItem('monthlyGoals', JSON.stringify(updatedGoals));
    };

    const addGoal = (description) => {
        if (goals.length >= MAX_GOALS_PER_MONTH) {
            // Alert the user that the maximum number of goals has been reached
            alert(`You can only set ${MAX_GOALS_PER_MONTH} goals per month.`);
            return;
        }
        if(description===""){
            alert("The Goal cannot be empty")
        }
        else{
            const newGoal = {
                id: Date.now(),
                description,
                status: 'pending',
            };
            const updatedGoals = [...goals, newGoal];
            setGoals(updatedGoals);
            saveGoalsToStorage(updatedGoals);   
        }
    };

    const deleteGoal = (id) => {
        const updatedGoals = goals.filter(goal => goal.id !== id);
        setGoals(updatedGoals);
        saveGoalsToStorage(updatedGoals);
    };

    return (
        <div className='monthlygoals-container'> 
            <div className='monthlygoals-head'>
                <h3>Monthly Goals</h3>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const description = e.target.elements.goal.value;
                        addGoal(description);
                        e.target.elements.goal.value = '';
                    }}>
                        <input type="text" name="goal" placeholder="Add a new goal" />
                        <button type="submit">Add Goal</button>
                    </form>
                </div>
            </div>
            <div>
                <ul className='goals-row ul'>
                    {goals.map(goal => (
                        <li key={goal.id} className='list li'>
                            <span>{goal.description}</span>
                            <FontAwesomeIcon icon={faCircleMinus} onClick={() => deleteGoal(goal.id)} className='delete-button'/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MonthlyGoals;
