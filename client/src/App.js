import React, { useEffect } from "react";
import s from "./App.css";
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, getUser, setCookie } from "./redux/actions/actions";
import { Home } from "./components/Home/Home";

function App() {
  const dispatch = useDispatch();
  const cookie = useSelector((state) => state.cookie);


  // SET COOKIE-----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      dispatch(setCookie(userId));
    }
    // eslint-disable-next-line
  }, []);

  //GET USER DATA----------------------------
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (cookie) {
      dispatch(getUser(userId));
    }
  }, [dispatch, cookie]);

  //GET ROOMS--------------------------------
  useEffect(() => {
    dispatch(getRooms());
    // eslint-disable-next-line
  }, []);
  

  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
