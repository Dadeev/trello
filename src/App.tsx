import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'All' | 'Active' | 'Completed'

type todoListType = {
    id: string
    title: string
    filter: filterValueType
}

type tasksStateType = {
    [todolistID: string]: TaskType[]
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolist, setTodolist] = useState<todoListType[]>([
        {id: todolistID_1, title: 'What to learn', filter: 'All'},
        {id: todolistID_2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks1, setTasks1] = useState<tasksStateType>({
        [todolistID_1]: [{id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'TSX', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}],
        [todolistID_2]: [{id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: true}]
    })

    const removeTask = (taskId: string, todolistID: string) => {
        setTasks1({...tasks1, [todolistID]: tasks1[todolistID].filter(t => t.id !== taskId)})
    }
    const addTask = (newTitle: string, todolistID: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}
        setTasks1({...tasks1, [todolistID]: [newTask, ...tasks1[todolistID]]})
    }
    const changeCheckBox = (id: string, value: boolean, todolistID: string) => {
        setTasks1({...tasks1, [todolistID]: tasks1[todolistID].map(t => t.id === id ? {...t, isDone: value} : t)})
    }
    const changeFilter = (value: filterValueType, todolistID: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistID ? {...tl, value: value} : tl))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistID))
        delete tasks1[todolistID]
    }

    const todolistsComponents = () => {
         return todolist.map(tl => {
            let filteredTasks = tasks1[tl.id];
            if (tl.filter === 'Active') {
                filteredTasks = tasks1[tl.id].filter((el) => el.isDone)
            }
            if (tl.filter === 'Completed') {
                filteredTasks = tasks1[tl.id].filter((el) => !el.isDone)
            }
            return (
                <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filterValue={tl.filter}
                    tasks1={filteredTasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeCheckBox={changeCheckBox}
                    removeTodolist={removeTodolist}
                />
            )
        })
    }
    return (
        <div className="App">
            {todolistsComponents()}
        </div>
    );
}

export default App;
