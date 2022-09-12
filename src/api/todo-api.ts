import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '01aa801c-2a8e-4bdc-82d2-9950462da9ea'
    }
})

export const TodoApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export type CommonResponseType<T = {}> = {
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
    data: T
}
export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}