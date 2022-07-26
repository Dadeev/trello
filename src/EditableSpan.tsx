import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';

type EditableSpanType = {
    title: string
    changeTitle: (editedTitle: string) => void
}

export const EditableSpan: FC<EditableSpanType> = ({title, changeTitle}) => {
    const [text, setText] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onKeDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()
    const onChangeSetText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(text)
    }
    return (
        editMode
            ? <input value={text}
                     onChange={onChangeSetText}
                     onKeyDown={onKeDownChangeTitle}
                     onBlur={offEditMode}
                     autoFocus
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};