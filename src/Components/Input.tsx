import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputType = {
    setNewTitle: (newTitle: string) => void
    newTitle: string
    callBack: () => void
}

export const Input: React.FC<InputType> = ({setNewTitle, newTitle,callBack}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callBack()
        }
    }
    return (
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}/>
        </div>
    );
};
