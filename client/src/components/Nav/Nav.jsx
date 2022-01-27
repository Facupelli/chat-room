import React from "react";
import s from "./Nav.module.css";

export const Nav = () => {
  

  return (
    <div className={s.div}>
      <div className={s.container}>
        <div className={s.chatroom}>
          <p>CHAT ROOM</p>
        </div>
        <div className={s.username}>
          <p>USER</p>
        </div>
      </div>
    </div>
  );
};
