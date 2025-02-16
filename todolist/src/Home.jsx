import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const API_URL = 'https://todo-m1kx.vercel.app'; // Backend URL


function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/get`)
      .then(result => setTodos(result.data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  const handleEdit = (id) => {
    axios.put(`${API_URL}/update/${id}`)
      .then(result => {
        setTodos(result.data);
        window.location.reload();
      })
      .catch(err => console.error('Error updating todo:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/delete/${id}`)
      .then(result => {
        setTodos(result.data);
        window.location.reload();
      })
      .catch(err => console.error('Error deleting todo:', err));
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(todo => (
          <div className='todoList' key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className='icon' />
              ) : (
                <BsCircleFill className='icon' />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
