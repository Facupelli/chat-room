import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../Modal/Modal";
import s from "./Nav.module.css";

export const Nav = () => {
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(true);
  };

  return (
    <>
      <div className={s.div}>
        <div className={s.container}>
          <div className={s.chatroom}>
            <p className={s.title}>CHAT ROOM</p>
            <p onClick={handleClick}>+ room</p>
          </div>
          <div className={s.username}>
            <p>{user.username}</p>
          </div>
        </div>
      </div>
      {modal && <Modal setModal={setModal} />}
    </>
  );
};
