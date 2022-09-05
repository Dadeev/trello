import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        // changeTaskStatus: action('changeTaskStatus'),
        // changeTaskTitle: action('changeTaskTitle'),
        // removeTask: action('removeTask'),
        // todolistId: 'todolistId123',
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: 'hey', title: 'CSS', isDone: true})

    const changeTaskStatus = () => {
        setTask({id: 'hey', title: task.title, isDone: !task.isDone})
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        setTask({id: 'hey', title: title, isDone: task.isDone})
    }

    return <Task {...args}
                 task={task}
                 todolistId={'Id123'}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle}/>
}

export const TaskStory = Template.bind({})

TaskStory.args = {
    removeTask: action('removeTask')
}

// export const TaskIsDoneStory = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsDoneStory.args = {
//     task: {id: 'hey', title: 'CSS', isDone: true},
// };
// export const TaskIsNotDoneStory = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsNotDoneStory.args = {
//     task: {id: 'yoyy', title: 'JS', isDone: false},
// };