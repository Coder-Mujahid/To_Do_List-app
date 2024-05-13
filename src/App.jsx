
import './App.css'

import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  console.log()

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
   <div className='w-11/12 m-auto text-[#4D869C]'>
     <div className="container flex flex-col gap-3 p-4 items-center  mx-auto w-full md:max-w-md mt-8 bg-[#CDE8E5] rounded-md">
      <h1 className="text-3xl font-semibold flex w-full justify-center items-center gap-3"> <img className='w-10' src="/public/img/to-do-list.png" alt="" />To-Do List</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center gap-3 w-full">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 w-full"
        >
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between border border-gray-300 rounded px-4 py-2 mb-2 ${
              task.completed ? 'bg-gray-200' : ''
            }`}
          >
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              className={`cursor-pointer ${task.completed ? 'line-through' : ''}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
   </div>
  );
};

export default App;

