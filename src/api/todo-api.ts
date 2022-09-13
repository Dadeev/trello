import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '01aa801c-2a8e-4bdc-82d2-9950462da9ea'
    }
})

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
export const TaskApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: CreateTaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, data: DataType) {
        return instance.put<CommonResponseType<{ item: updateTaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, data)
    },
    deleteTaskType(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
export type TasksType = {
    items: TaskType[];
    totalCount: number;
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type CreateTaskType = {
    id: string;
    title: string;
    todoListId: string;
    order: number;
    status: number;
    priority: number;
    addedDate: string;
}
export type DataType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: null | number,
    deadline: null | number
}

export type updateTaskType = {
    id: string;
    title: string;
    description: string;
    todoListId: string;
    order: number;
    status: number;
    priority: number;
    addedDate: string;
}
