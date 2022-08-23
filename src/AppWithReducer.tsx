import React, {useReducer, useState} from 'react';
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
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id,todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(ChangeTodolistFilterAC(value, todolistId))
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolists(ChangeTodolistTitleAC(id,title))
    }
    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const todoListsComponents = todolists.map(tl => {
        let allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
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

export default AppWithReducer;
