import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    id: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

const initialState: Array<TodolistType> = []
export const todolistsReducer =
    (state = initialState, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.id)
            case 'ADD-TODOLIST':
                return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)
            case "CHANGE-TODOLIST-TITLE":
                return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            default:
                return state
        }
    }

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: 'REMOVE-TODOLIST', id})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: 'ADD-TODOLIST', title, todolistId: v1()})
export const ChangeTodolistFilterAC = (value: FilterValuesType, id: string): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    value,
    id
})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
})