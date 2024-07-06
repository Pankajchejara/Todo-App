import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../slices/tasks/taskSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const dispatch = useDispatch();
  const taskToEdit = useSelector((state) => state.tasks.taskToEdit);

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setEditMode(true);
      setEditTaskId(taskToEdit.id);
    }
  }, [taskToEdit]);

  const handleAddOrEditTask = () => {
    if (task.trim()) {
      if (editMode) {
        dispatch(editTask({ id: editTaskId, newTask: task }));
        setEditMode(false);
        setEditTaskId(null);
      } else {
        dispatch(addTask(task));
      }
      setTask('');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddOrEditTask()}
        className="w-full p-2 text-white rounded mb-2 outline-none bg-richblack-400 "
        placeholder="Enter a task"
      />
      <button
        onClick={handleAddOrEditTask}
        className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editMode ? 'Save Task' : 'Add Task'}
      </button>
      {editMode && (
        <button
          onClick={() => {
            setEditMode(false);
            setTask('');
            setEditTaskId(null);
          }}
          className=" text-yellow-200 px-4 py-2 rounded hover:text-yellow-25 ml-2"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default TaskInput;
