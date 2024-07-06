import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion, deleteCompletedTasks } from '../slices/tasks/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleEditTask = (task) => {
    dispatch({ type: 'tasks/taskToEdit', payload: task });
  };

  return (
    <div>
      <ul className="list-disc list-inside">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTaskCompletion(task.id))}
                className="mr-2 "
              />
              <span className={task.completed ? 'line-through text-blue-25' : ' text-blue-25'}>{task.task}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditTask(task)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="bg-red-100 text-white px-4 py-1 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {tasks.some(task => task.completed) && (
        <button
          onClick={() => dispatch(deleteCompletedTasks())}
          className="mt-4 bg-red-100 text-white px-4 py-1 rounded hover:bg-red-200"
        >
          Delete All Completed Tasks
        </button>
      )}
    </div>
  );
};

export default TaskList;
