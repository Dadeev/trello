import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppThunk} from "./store";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type SetTodolistsActionType = ReturnType<typeof setTodolistAC>;
export type TodolistsActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLIST": {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolistId: string, todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolistId, todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todolists} as const
}

export const getTodos = (): AppThunk => async dispatch => {
    try {
        let res = await todolistsAPI.getTodolists()
        dispatch(setTodolistAC(res.data))
    } catch (e) {
        console.log(e)
    }
}


export const deleteTodoTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
    } catch (e) {
        console.log(e)
    }
}

export const createTodoTC = (title: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.createTodolist(title)
        dispatch(getTodos())
        // dispatch(addTodolistAC(res.data.data.item.id, res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}

export const changeTodoTitleTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.updateTodolist(todolistId, title)
        dispatch(changeTodolistTitleAC(todolistId, title))
    } catch (e) {
        console.log(e)
    }
}