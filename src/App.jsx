import './App.css';

import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

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
    <div className='w-11/12 m-auto text-[#000000]'>
      <div className="container flex flex-col gap-3 p-4 items-center overflow-hidden mx-auto w-full md:max-w-md mt-8 bg-[#CDE8E5] rounded-md">
        <h1 className="md:text-3xl text-xl py-2 font-semibold flex w-full justify-center items-center gap-3"> <img className='md:w-10 w-8' src="/public/img/to-do-list.png" alt="" />To-Do List App</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={handleChange}
            className=" border-none bg-[#EEF7FF] font-medium text-[#000000] text-lg rounded px-4 py-2 w-full outline-none"
          />
          <button
            type="submit"
            className="bg-[#4D869C] text-[#000000] text-lg font-medium rounded px-4 py-2 w-full"
          >
            Add to Shortlist
          </button>
        </form>
        <ul className='overflow-x-hidden flex flex-col items-center w-full h-auto'>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center gap-2 w-full h-auto justify-between border border-gray-300 rounded p-2 mb-2 ${
                task.completed ? 'bg-gray-200' : ''
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className={`cursor-pointer text-wrap basis-11/12 ${task.completed ? 'line-through' : 'animate-pulse'}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 basis-1/12 flex justify-end"
              >
                <img className='md:w-6 w-4' src="/public/img/delete.png" alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
