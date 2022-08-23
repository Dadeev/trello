import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistAT
    | RemoveTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer =
    (state = initialState, action: ActionType): TasksStateType => {
        switch (action.type) {
            case 'REMOVE-TASK':
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
                }
            case 'ADD-TASK':
                return {
                    ...state,
                    [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
                }
            case "CHANGE-TASK-STATUS":
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                        ...task,
                        isDone: action.isDone
                    } : task)
                }
            case "CHANGE-TASK-TITLE":
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                        ...task,
                        title: action.title
                    } : task)
                }
            case 'ADD-TODOLIST':
                return {
                    ...state,
                    [action.todolistId]: []
                }
            case "REMOVE-TODOLIST":
                let copyState = {...state}
                delete copyState[action.id]
                return copyState
            default:
                return state
        }
    }

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId, isDone, todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    taskId,
    title,
    todolistId
} as const)