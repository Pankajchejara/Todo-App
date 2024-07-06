import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const App = () => (
  <div className='bg-richblack-900 w-[100vw] h-[100vh] overflow-hidden'>
  <div className="sm:max-w-lg mx-auto mt-10 p-4  bg-richblack-700  rounded max-w-[300px]">
    <h1 className="text-3xl font-bold mb-4 text-center text-blue-100">Todo App</h1>
    <TaskInput />
    <TaskList />
  </div>
  </div>
);

export default App;
