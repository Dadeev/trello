import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddSharp} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return <div>
        <TextField
            variant={"outlined"}
            size={'small'}
            value={title}
            label={'Title'}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            helperText={error && 'Title is required'}
            error={!!error}
        />
        <IconButton size={'small'} onClick={addItem}>
            <AddSharp/>
        </IconButton>
    </div>
}
