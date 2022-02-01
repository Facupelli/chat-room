import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./Chat.module.css";
import { Nav } from "../Nav/Nav";
import { useSelector } from "react-redux";

export const Chat = ({socket}) => {
  

  const [chat, setChat] = useState([]);
  console.log("CHAT", chat);

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

  const onSubmit = (data) => {
    console.log("DATA", data);

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
