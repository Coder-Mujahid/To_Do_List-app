import './App.css';
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

import deleteIcon from '../public/img/delete.png';
import blankIcon from '../public/img/blank-check-box (1).png';
import checkIcon from '../public/img/checkbox.png';
import Icon from '../public/img/to-do-list.png';

const App = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
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
    <div className='w-11/12 h-screen m-auto text-[#000000] flex items-center justify-center'>
      <div className="container flex flex-col gap-3 p-4 items-center overflow-hidden mx-auto w-full md:max-w-md mt-8 bg-[#7AB2B2] rounded-md">
        <h1 className="md:text-3xl text-xl py-2 font-semibold flex w-full justify-center items-center gap-3">
          <img className='md:w-10 w-8' src={Icon} alt="icon" />
          To-Do List App
        </h1>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={handleChange}
            className="border-none shadow-sm shadow-slate-400 bg-[#EEF7FF] font-medium text-[#000000] text-lg rounded px-4 py-2 w-full outline-none"
          />
          <button
            type="submit"
            className="bg-[#4D869C] shadow-sm shadow-slate-400 text-[#000000] text-lg font-medium rounded px-4 py-2 w-full"
          >
            Add to Shortlist
          </button>
        </form>
        <ul className='overflow-x-hidden flex flex-col items-center w-full h-auto'>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center gap-2 w-full shadow-sm shadow-slate-400 h-auto justify-between border border-[#7AB2B2] rounded-md p-2 mb-2 ${task.completed ? 'bg-gray-200' : 'bg-[#CDE8E5]'
                }`}
            >
              <p
                title={task.completed ? 'Task is completed' : 'The task remains'}
                className={`cursor-pointer text-clip overflow-hidden basis-10/12 ${task.completed ? 'line-through' : 'animate-pulse'}`}
                style={{ transition: 'none' }}
              >
                {task.text}
              </p>
              <div className='flex flex-row justify-center gap-1 basis-2/12'>
                <button onClick={() => toggleTaskCompletion(task.id)}>
                  <img className='md:w-6 w-4' src={task.completed ? checkIcon : blankIcon} alt="icon" />
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                  <img className='md:w-6 w-4' src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
