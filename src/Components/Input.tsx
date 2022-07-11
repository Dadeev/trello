import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './../Todolist.module.css'

type InputType = {
    setNewTitle: (newTitle: string) => void
    newTitle: string
    callBack: () => void
    setError: (error: string | null) => void
    error: string | null
}

export const Input: React.FC<InputType> = ({setNewTitle, newTitle, callBack, error, setError}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callBack()
        }
    }
    return (
        <>
            <input className={error ? s.error : ''} value={newTitle} onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}/>
        </>
    );
};
