import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./Components/Button";
import {FullInput} from "./Components/FullInput";
import {Input} from "./Components/Input";
import s from './Todolist.module.css'
import {CheckBox} from "./Components/CheckBox";

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
    changeCheckBox: (id: string, value: boolean) => void
    filterValue: filterValueType
}

export const Todolist = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const tsarChangeFilterHandler = (value: filterValueType) => {
        props.changeFilter(value)
    }
    const onClickHandler = (taskId: string) => {
        props.removeTask(taskId)
    }
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeCheckBoxHandler = (id: string, event: boolean) => {
        props.changeCheckBox(id, event)
    }
    return (
        <div>
            {/*<FullInput/>*/}
            <h3>{props.title}</h3>
            <Input setNewTitle={setNewTitle} newTitle={newTitle} error={error} setError={setError}
                   callBack={addTaskHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ul>
                {props.tasks1.map((el) => {
                    return (
                        <li key={el.id} className={el.isDone ? s.isDone : ''}>
                            <Button name={'x'} callBack={() => onClickHandler(el.id)}/>
                            <CheckBox checked={el.isDone} callBack={(event)=>changeCheckBoxHandler(el.id,event)}/>
                            {/*<input type="checkbox" checked={el.isDone}*/}
                            {/*       onChange={(event) => changeCheckBoxHandler(el.id, event.currentTarget.checked)}/>*/}
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button className={props.filterValue === 'All' ? s.activeFilter : ''} name={'All'}
                        callBack={() => tsarChangeFilterHandler('All')}/>
                <Button className={props.filterValue === 'Active' ? s.activeFilter : ''} name={'Active'}
                        callBack={() => tsarChangeFilterHandler('Active')}/>
                <Button className={props.filterValue === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                        callBack={() => tsarChangeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}