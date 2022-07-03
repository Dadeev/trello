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
    tasks1: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (value: filterValueType)=> void

}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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