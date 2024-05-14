import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { db, auth } from "../firebase"; 
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import axios from 'axios';
import { Cookies } from "react-cookie";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [username, setUsername] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const cookies = new Cookies(); 

  // useEffect(() => {

  //   async function fetchTodos() {
  //       try {
  //           const userId = cookies.get('user_id'); // Get the user_id from cookies
  //           const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/todos`);
  //           setTodos(response.data); // Set the todos in state
  //       } catch (error) {
  //           console.error('Error fetching todos:', error);
  //       }
  //   }

  //   const intervalId = setInterval(fetchTodos, 1000); // Fetch todos every 5 seconds

  //   return () => clearInterval(intervalId); // Cleanup function to clear the interval
  // }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Get user ID from cookies
        const cookies = new Cookies();
        const userId = cookies.get("user_id");
  
        // Fetch todos using user ID
        const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/todos`);
        console.log(response.data); // Log the response object
        // Set todos based on the structure of the response
        setTodos(response.data); // Assuming todos are stored in response.data
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
  
    const intervalId = setInterval(fetchTodos, 5000); // Fetch todos every 5 seconds
  
    fetchTodos(); // Initial fetch
  
    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);
  

  function addTodo(user_id, title) {
      axios.post(`http://127.0.0.1:8000/users/${user_id}/todos/`, {
          title: title,
          completed: false,
          isEditing: false,
      })
      .then(response => {
          console.log('Todo added:', response.data); // Log the created todo
          // You can perform additional actions here if needed
      })
      .catch(error => {
          console.error('Error adding todo:', error); // Log any errors
      });
  }

  function toggleTodo(user_id, todo_id, title, checked) {
      axios.put(`http://127.0.0.1:8000/users/${user_id}/todos/${todo_id}`, {  
        title: title,
        completed: checked,
        isEditing: false,
      })
      .then(response => {
          console.log('Todo toggled:', response.data); // Log the updated todo
          // You can perform additional actions here if needed
      })
      .catch(error => {
          console.error('Error toggling todo:', error); // Log any errors
      });
  }
  
  function deleteTodo(user_id, todo_id) {
      axios.delete(`http://127.0.0.1:8000/users/${user_id}/todos/${todo_id}`)
      .then(() => {
          console.log('Todo deleted'); // Log success message
          // You can perform additional actions here if needed
      })
      .catch(error => {
          console.error('Error deleting todo:', error); // Log any errors
      });
  }
  
  function editTodo(user_id, todo_id, newTitle) {
      axios.put(`http://127.0.0.1:8000/users/${user_id}/todos/${todo_id}`, {
          title: newTitle,
          completed: false,
          isEditing: false,
      })
      .then(response => {
          console.log('Todo edited:', response.data); // Log the updated todo
          // You can perform additional actions here if needed
      })
      .catch(error => {
          console.error('Error editing todo:', error); // Log any errors
      });
  }
  

  function filterTodo() {
    switch (filter) {
      case "Active":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  return (
    <>
    <div className="absolute top-0 left-0 mt-4 ml-4 flex items-center">
      <Link to="/homepage">
        <button className="w-8 h-8 flex items-center justify-center bg-pink-500 hover:bg-pink-700 text-white font-bold rounded-full">
          <svg className="w-4 h-4 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
        </button>
      </Link>
      
    </div>

    {/* <div className="absolute top-0 right-0 mt-4 mr-4 flex items-center">
    <h2 className="text-2xl font-semibold text-pink-300 mr-2">{username || "User"}</h2>
        {profilePictureURL ? (
            <img
                src={profilePictureURL}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
            />
        ) : (
            <svg className="w-10 h-10 text-gray-400 bg-gray-200 rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
        )}
    </div> */}
        <div className="absolute top-0 right-0 mt-4 mr-4 flex items-center">
            <ColorModeSwitcher />
        </div>
          
    
      <TodoForm addTodo={addTodo} filterTodo={filterTodo} setFilter={setFilter} />
      <TodoList
        todos={filterTodo()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </>
  );
}

export default Todo;