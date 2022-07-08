import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type FullInputType = {
    callBack: (title: string) => void
}

export const FullInput = (props: FullInputType) => {
    const [newTitle, setNewTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            AddTaskHandler()
        }
    }
    const AddTaskHandler = () => {
        props.callBack(newTitle)
        setNewTitle('')
    }
    return (
        <div>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}/>
                <button onClick={AddTaskHandler}>+</button>
            </div>
        </div>
    );
};
