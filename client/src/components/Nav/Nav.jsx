import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../Modal/Modal";
import s from "./Nav.module.css";

export const Nav = ({ setShowChat, setShowRooms, showRooms, showChat }) => {
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const handleAddRoom = () => {
    setModal(true);
  };

  const handleJoinRoom = () => {
    setShowChat(!showChat);
    setShowRooms(!showRooms);
  };

  return (
    <>
      <div className={s.div}>
        <div className={s.container}>
          <div className={s.chatroom}>
            <span className={s.title}>CHAT ROOM</span>
            <div className={showRooms ? s.joinRoomActive : s.joinRoom}>
              <span onClick={handleJoinRoom}>join room</span>
            </div>
            <span onClick={handleAddRoom}>+ room</span>
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
