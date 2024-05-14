import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; 
import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";

import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoutes from './components/PrivateRoutes';

axios.defaults.withCredentials = true;

function App() {
  
  const [cookies] = useCookies();
  const token = cookies.session;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private Routes */}
        {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/homepage" element={<Landing />} />
          <Route path="/todo" element={<Todo />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        {/* </Route> */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
