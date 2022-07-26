import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';


type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormType> = ({addItem}) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }
    const onClickAddItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressAddItem}
                   className={error ? "error" : ""}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
