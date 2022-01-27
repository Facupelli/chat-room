import React from "react";
import { Chat } from "./components/Chat/Chat";
import s from './App.css'
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
