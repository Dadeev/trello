import React from "react";

type TodolistPropsType = {
    title?: string
    title2?: number
    tasks1: Array<inArrayType>
    topCars?: Array<topCarsType>
}
type inArrayType = {
    id: number,
    title: string,
    isDone: boolean
}

type topCarsType = {
    manufacturer: string,
    model: string
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks1.map((el,index) => {
                    return (
                        <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}