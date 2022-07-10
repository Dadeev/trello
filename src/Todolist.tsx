import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./Components/Button";
import {FullInput} from "./Components/FullInput";
import {Input} from "./Components/Input";

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

    const tsarChangeFilterHandler = (value: filterValueType) => {
        props.changeFilter(value)
    }
    const onClickHandler = (taskId: string) => {
        props.removeTask(taskId)
    }
    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    return (
        <div>
            {/*<FullInput/>*/}
            <h3>{props.title}</h3>
            <Input setNewTitle={setNewTitle} newTitle={newTitle} callBack={addTaskHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>
            <ul>
                {props.tasks1.map((el) => {
                    return (
                        <li key={el.id}>
                            <Button name={'x'} callBack={() => onClickHandler(el.id)}/>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={() => tsarChangeFilterHandler('All')}/>
                <Button name={'Active'} callBack={() => tsarChangeFilterHandler('Active')}/>
                <Button name={'Completed'} callBack={() => tsarChangeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}