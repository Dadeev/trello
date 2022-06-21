import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Kabzda', isDone: false},
        {id: 5, title: 'Simple', isDone: true},
        {id: 6, title: 'Wow', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'Hello World', isDone: true},
        {id: 2, title: 'I am happy', isDone: true},
        {id: 3, title: 'Yo', isDone: false}
    ]
    const topCars = [
        {manufacturer:'BMW', model:'m5cs'},
        {manufacturer:'Mercedes', model:'e63s'},
        {manufacturer:'Audi', model:'rs6'}
    ]
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks1={tasks1} topCars={topCars}/>
            <Todolist title={'What to buy'} tasks1={tasks2} topCars={topCars}/>
        </div>
    );
}

export default App;

