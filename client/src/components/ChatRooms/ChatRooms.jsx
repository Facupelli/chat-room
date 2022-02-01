import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import s from "./ChatRooms.module.css";

export const ChatRooms = ({ socket, setCurrentRoom, currentRoom, setChat, chat }) => {
  const rooms_joined = useSelector((state) => state.rooms_joined);
  const username = useSelector((state) => state.user.username);
  const userId = localStorage.getItem("userId");

  const handleClick = (roomName, username, roomId) => {
    const roomInfo = {
      roomId,
      roomName,
      username,
      userId,
    };

    if (currentRoom.roomName !== roomName && currentRoom.roomId !== roomId) {
      setCurrentRoom({
        roomName,
        roomId,
      });

      setChat({messages:[]})

      socket.emit("joinRoom", roomInfo);
    }

  };

  return (
    <div className={s.container}>
      <p>My Rooms</p>
      <div>
        {rooms_joined &&
          rooms_joined.map((el, i) => (
            <div
              key={i}
              className={s.block}
              onClick={() => handleClick(el.name, username, el.id)}
            >
              <div className={s.title}>
                <p className={s.room_name}>{el.name}</p>
              </div>
              <p>{el.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
