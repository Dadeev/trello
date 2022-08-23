import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import Button from '@material-ui/core/Button';
import {AppBar, Container, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/icons/Menu';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {Todolist1} from "./Todolist1";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(ChangeTodolistFilterAC(value, todolistId))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(ChangeTodolistTitleAC(id, title))
    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatch(action)

    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const todoListsComponents = todolists.map(tl => {
        // let allTodolistTasks = tasks[tl.id];
        // let tasksForTodolist = allTodolistTasks;
        //
        // if (tl.filter === "active") {
        //     tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
        // }
        // if (tl.filter === "completed") {
        //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
        // }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <Todolist1
                        todolist={tl}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
