
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [tasks, setTasks] = useState([])
    const [accomplish, setAccomplish] = useState('')




    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = () => {
        axios
        .get('http://localhost:3001/tasks')
        .then((res) => {
            setTasks(res.data)
            console.log(res.data)
        })
        .catch((error) => {
            console.log('Unable to fetch tasks')
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/tasks', { accomplish })
        .then(() => {
            setAccomplish('')
            fetchTasks();
        })
        .catch((error) => {
            console.log('Unable to post task')
        })
    }

    const handleDelete = (id) => {
        axios
        .delete(`http://localhost:3001/tasks/${id}`)
        .then(() => {
            fetchTasks()
        })
        .catch((error) => {
            console.log('Unable to delete task')
        })
    }
    



  return (
     <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white rounded shadow-md flex justify-center h-screen">
    
  
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white rounded shadow-md">
    <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4">
        <label className="text-lg" htmlFor="task">Task:</label>
        <input
          type="text"
          id="task"
          value={accomplish}
          placeholder="Type todo here..."
          onChange={(e) => setAccomplish(e.target.value)}
          className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded"
      >
        Submit Todo
      </button>
    </form>
    <hr className="my-4 border-gray-300" />
    <h2 className="text-2xl mb-4">Todo List:</h2>
    <ul className="list-none mb-4">
      {tasks.map((task) => (
        <li key={task._id} className="flex justify-between mb-2">
          <span className="text-lg">{task.accomplish}</span>
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
  </div>
  )
}

export default Home
