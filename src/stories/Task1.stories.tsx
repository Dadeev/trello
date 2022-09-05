import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {Task1} from "../Task1";
import {TaskType} from "../Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task1',
    component: Task1,
    decorators: [ReduxStoreProviderDecorator],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof Task1>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const UsingReduxComponent = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <Task1 task={task} todolisId={'todolistId1'}/> // specific id of todolist
}
const Template: ComponentStory<typeof UsingReduxComponent> = (args) => <UsingReduxComponent/>

export const Task1Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Task1Story.args = {};
