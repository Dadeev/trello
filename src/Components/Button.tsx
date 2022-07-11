import React from 'react'
import s from './../Todolist.module.css'


type ButtonType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    )
}