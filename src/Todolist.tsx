import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";

type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

type PropsType = {
    title?: string
    title2?: number
    tasks1: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValueType) => void
    addTask: (newTitle: string) => void

}

export const Todolist = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState('')

    const AddTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            AddTaskHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}/>
                <button onClick={AddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks1.map((el, index) => {
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
                <button onClick={() => props.changeFilter('All')}>All</button>
                <button onClick={() => props.changeFilter('Active')}>Active</button>
                <button onClick={() => props.changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}