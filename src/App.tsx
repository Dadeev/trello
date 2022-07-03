import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterValueType = 'All' | 'Active' | 'Completed'

function App() {
    let [tasks1, setTasks1] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'TSX', isDone: true},
        {id: 4, title: 'ReactJS', isDone: false}
    ])
    const removeTask = (taskId: number) => {
        tasks1 = tasks1.filter((el) => el.id !== taskId)
        setTasks1(tasks1)
    }

    const [filterValue, setFilterValue] = useState('All')

    const changeFilter = (value: filterValueType) => {
        setFilterValue(value)
    }

    let filteredTasks = tasks1;
    if (filterValue === 'Active') {
        filteredTasks = tasks1.filter((el) => el.isDone === true)
    }
    if (filterValue === 'Completed') {
        filteredTasks = tasks1.filter((el) => el.isDone === false)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks1={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

