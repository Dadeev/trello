export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'
export type ErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType
}

type InitialStateType = typeof initialState

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_SET_ERROR:
            return {...state, error: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const)
export const setAppErrorAC = (value: ErrorType) => ({type: APP_SET_ERROR, value} as const)
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>