import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {BackspaceOutlined, DeleteOutlined} from "@material-ui/icons";
import {TasksStateType, TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function Todolist1({todolist}: PropsType) {
    const {title, id, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch();
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodolist = () => {
        let action = RemoveTodolistAC(id);
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }

    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC('all', id));
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC('active', id));
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC('completed', id));

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton size={'small'} onClick={removeTodolist}>
                <BackspaceOutlined fontSize={'small'}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id));
                    }

                    return <ListItem disableGutters divider key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox size={'small'} color={'primary'} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton size={'small'} onClick={onClickHandler}>
                            <DeleteOutlined fontSize={'small'}/>
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <ButtonGroup disableElevation size={'small'} color={'primary'}
                         aria-label="small contained primary button group">
                <Button variant={filter === 'all' ? "contained" : undefined} onClick={onAllClickHandler}>All
                </Button>
                <Button variant={filter === 'active' ? "contained" : undefined} onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={filter === 'completed' ? "contained" : undefined}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}

