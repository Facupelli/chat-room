import React, { useEffect } from "react";
import { Chat } from "./components/Chat/Chat";
import s from './App.css'
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setCookie } from "./redux/actions/actions";


function App() {
  const dispatch = useDispatch()
  const cookie = useSelector((state) => state.cookie);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      dispatch(setCookie(userId));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (cookie) {
      dispatch(getUser(userId));
    }
  }, [dispatch, cookie]);


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
