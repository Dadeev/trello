import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolist, setTodolist] = useState<todoListType[]>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks1, setTasks1] = useState({
        [todolistID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'TSX', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: true}
        ]
    })

    function removeTask(todolistID: string, taskId: string) {
        setTasks1({...tasks1, [todolistID]: tasks1[todolistID].filter(t => t.id !== taskId)})
    }

    function addTask(todolistID: string, title: string) {
        setTasks1({...tasks1, [todolistID]: [{id: v1(), title, isDone: true}, ...tasks1[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks1({...tasks1, [todolistID]: tasks1[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolist(todolist.map(t => t.id === todolistID ? {...t, filter: value} : t))
    }

    function RemoveTodolist(todolistID: string) {
        setTodolist(todolist.filter(t => t.id !== todolistID))
        delete tasks1[todolistID]
    }

    return (
        <div className="App">
            {todolist.map(tl => {
                let tasksForTodolist = tasks1[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks1[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks1[tl.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        todolistID={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        RemoveTodolist={RemoveTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
