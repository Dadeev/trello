import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    changeTodolistFilterAC,
    changeTodoTitleTC,
    createTodoTC,
    deleteTodoTC,
    FilterValuesType,
    getTodos
} from './state/todolists-reducer'
import {addTasksTC, changeTaskTitleAC, removeTaskTC, updateTaskTC} from './state/tasks-reducer';
import {TaskStatuses, TaskType} from './api/todolists-api'
import {useAppDispatch, useAppSelector} from "./hooks/hooks";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTasksTC(todolistId, title))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);


    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(deleteTodoTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodoTitleTC(id, title))
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTodos())
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
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
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
