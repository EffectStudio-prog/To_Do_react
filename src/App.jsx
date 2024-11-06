// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Function to edit a task
  const editTask = (index) => {
    const updatedTask = prompt("Edit your task:", tasks[index]);
    if (updatedTask !== null && updatedTask.trim() !== "") {
      const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
      setTasks(updatedTasks);
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // useEffect to listen for Enter key and trigger addTask
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevents any default action like form submission
        addTask();
      }
    };

    // Add event listener
    document.addEventListener('keypress', handleKeyPress);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [newTask]);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="main">
        <input
          type="text"
          placeholder="Add Tasks"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className='add-button' onClick={addTask}>➕</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <div>
              <button className="edit" onClick={() => editTask(index)}>
                ✏️
              </button>
              <button onClick={() => deleteTask(index)}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
