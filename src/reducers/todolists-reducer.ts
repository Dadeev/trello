import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
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

export const todolistsReducer =
    (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return todolists.filter(tl => tl.id != action.id)
            case 'ADD-TODOLIST':
                return [...todolists, {id: action.id, title: action.title, filter: 'all'}]
            case 'CHANGE-TODOLIST-FILTER':
                return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)
            case "CHANGE-TODOLIST-TITLE":
                return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            default:
                return todolists
        }
    }

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: 'REMOVE-TODOLIST', id})
export const AddTodolistAC = (title: string, id: string): AddTodolistAT => ({type: 'ADD-TODOLIST', title, id})
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