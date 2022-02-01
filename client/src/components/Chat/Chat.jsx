import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./Chat.module.css";
import { Nav } from "../Nav/Nav";
import { useSelector } from "react-redux";
import axios from "axios";

export const Chat = ({ socket, currentRoom }) => {
  const username = useSelector((state) => state.user.username);
  const userId = localStorage.getItem("userId");

  const [chat, setChat] = useState([]);
  console.log("CHAT", chat);

  //LOAD CHAT MESSAGES ------------------------

  useEffect(() => {
    if (currentRoom.roomName.length > 0) {
      axios
        .get(
          `/chatmessage?roomId=${currentRoom.roomId}&roomName=${currentRoom.roomName}`
        )
        // .then((res) => console.log("GET MESSAGES", res))
        .then(res => setChat(res.data.rows))
        // .then((res) => setChat([...chat, res.data.rows.map(el => el)]));
    }
  }, [currentRoom]);

  //SOCKET ----------------------------------------

  const socketOn = () => {
    if (socket) {
      socket.on("message", (message) => {
        setChat([...chat, message]);
      });
    }
  };

  useEffect(() => {
    socketOn();
  });

  // -------------------- FORM ----------------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("DATA", data);
    const messageInfo = {
      username,
      text: data.message,
      room: currentRoom.roomName,
      userId,
      roomId: currentRoom.roomId,
    };

    await axios.post("/chatmessage", messageInfo);

    //emit message to server
    socket.emit("chatMessage", data.message);
    reset();
  };

  // -------------------- SCROLL TO BOTTOM --------------------------------
  return (
    <div className={s.container}>
      <div className={s.chatlog}>
        {chat.length > 0 &&
          chat.map((el, i) => (
            <div key={i} className={s.message}>
              <p className={s.username}>{el.username}</p>
              <p className={s.text}>{el.text}</p>
              <p className={s.time}>{el.time}</p>
            </div>
          ))}
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("message")} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
