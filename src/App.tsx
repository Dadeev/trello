import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'All' | 'Active' | 'Completed'

function App() {
    let [tasks1, setTasks1] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TSX', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])
    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}
        setTasks1([newTask, ...tasks1])
    }

    const removeTask = (taskId: string) => {
        tasks1 = tasks1.filter((el) => el.id !== taskId)
        setTasks1(tasks1)
    }

    const [filterValue, setFilterValue] = useState('All')

    const changeFilter = (value: filterValueType) => {
        setFilterValue(value)
    }

    let filteredTasks = tasks1;
    if (filterValue === 'Active') {
        filteredTasks = tasks1.filter((el) => el.isDone)
    }
    if (filterValue === 'Completed') {
        filteredTasks = tasks1.filter((el) => !el.isDone)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks1={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;