import React, {useState} from "react";
import {filterValueType} from "./App";

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title?: string
    title2?: number
    tasks1: Array<TaskType>
    removeTask: (taskId: number) => void
}

export const Todolist = (props: PropsType) => {
    const [filterValue, setFilterValue] = useState('All')

    const changeFilter = (value: filterValueType) => {
        setFilterValue(value)
    }

    let filteredTasks = props.tasks1;
    if (filterValue === 'Active') {
        filteredTasks = props.tasks1.filter((el) => el.isDone === true)
    }
    if (filterValue === 'Completed') {
        filteredTasks = props.tasks1.filter((el) => el.isDone === false)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredTasks.map((el, index) => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )

                })}
            </ul>
            <div>
                <button onClick={() => changeFilter('All')}>All</button>
                <button onClick={() => changeFilter('Active')}>Active</button>
                <button onClick={() => changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}