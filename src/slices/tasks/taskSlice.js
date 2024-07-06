import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  taskToEdit: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), task: action.payload, completed: false });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteCompletedTasks: (state) => {
      state.tasks = state.tasks.filter((task) => !task.completed);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex].task = action.payload.newTask;
      }
      state.taskToEdit = null;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskCompletion: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex >= 0) {
        state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    taskToEdit: (state, action) => {
      state.taskToEdit = action.payload;
    },
  },
});

export const { addTask, deleteTask, deleteCompletedTasks, editTask, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
