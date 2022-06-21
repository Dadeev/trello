import React from "react";

type TodolistPropsType = {
    title?: string
    title2?: number
    tasks1: Array<inArrayType>
    topCars: Array<topCarsType>
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
            <h3>{props.title2}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.topCars.map((el) => {
                    return (
                        <li><input type="checkbox" checked={true}/> <span>{el.manufacturer}</span></li>
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