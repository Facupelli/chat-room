import React from "react";
import { useSelector } from "react-redux";
import s from "./Nav.module.css";

export const Nav = () => {
  const user = useSelector(state => state.user)

  return (
    <div className={s.div}>
      <div className={s.container}>
        <div className={s.chatroom}>
          <p>CHAT ROOM</p>
        </div>
        <div className={s.username}>
          <p>{user.username}</p>
        </div>
      </div>
    </div>
  );
};
