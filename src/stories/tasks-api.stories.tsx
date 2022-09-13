import React, {useEffect, useState} from 'react'
import {TaskApi} from "../api/todo-api";

export default {
    title: 'API-Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '98e6fa22-e954-4054-b025-9907cddb4979'
        TaskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '98e6fa22-e954-4054-b025-9907cddb4979'
        TaskApi.createTasks(todolistId, 'hey hey!!!')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '98e6fa22-e954-4054-b025-9907cddb4979';
        const taskId = '0f9fb9fd-779a-4a70-9e8a-a21d9848c539';
        const data = {
            title: 'some title',
            description: 'wow it is a some text',
            completed: true,
            status: 0,
            priority: 23,
            startDate: null,
            deadline: null
        }
        TaskApi.updateTask(todolistId, taskId, data)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '98e6fa22-e954-4054-b025-9907cddb4979';
        const taskId = '0f9fb9fd-779a-4a70-9e8a-a21d9848c539';
        TaskApi.deleteTaskType(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}