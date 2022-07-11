import React, {ChangeEvent} from "react";


type CheckBoxType = {
    checked: boolean
    callBack: (event: boolean)=>void
}

export const CheckBox: React.FC<CheckBoxType> = ({checked,callBack}) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={checked}
               onChange={onChangeHandler}/>
    )
}