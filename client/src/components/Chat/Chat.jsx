import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./Chat.module.css";
import { Nav } from "../Nav/Nav";
import { useSelector } from "react-redux";
import axios from "axios";

export const Chat = ({ socket, currentRoom }) => {
  const username = useSelector((state) => state.user.username);
  const userId = localStorage.getItem("userId");

  const [totalRows, setTotalRows] = useState("");
  const [loadPetitions, setLoadPetitions] = useState(1);

  const [chat, setChat] = useState({
    messages: [],
  });
  console.log("CHAT.MESSAGES", chat.messages);

  //LOAD CHAT MESSAGES ------------------------

  useEffect(() => {
    if (currentRoom.roomName.length > 0) {
      axios
        .get(
          `/chatmessage?roomId=${currentRoom.roomId}&roomName=${currentRoom.roomName}`
        )
        // .then((res) => console.log("GET MESSAGES", res))
        .then((res) => {
          setChat({
            messages: chat.messages.concat(res.data.rows),
          });
          setTotalRows(res.data.count);
        });
      // .then((res) => setChat([...chat, res.data.rows.map(el => el)]));
    }
  }, [currentRoom]);

  //SOCKET ----------------------------------------

  const socketOn = () => {
    if (socket) {
      socket.on("message", (message) => {
        setChat({ messages: [...chat.messages, message] });
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

  //handleLoadMessages -----------------------------
  const handleLoadMessages = async () => {
    const pageNumber = Math.floor(totalRows / 10);

    if (pageNumber - loadPetitions >= 0) {
      axios
        .get(
          `/chatmessage?roomId=${currentRoom.roomId}&roomName=${
            currentRoom.roomName
          }&page=${pageNumber - loadPetitions}`
        )
        .then((res) => {
          setChat({ messages: res.data.rows.concat(chat.messages) });
          setLoadPetitions(loadPetitions + 1);
        });
    }
  };

  // -------------------- SCROLL TO BOTTOM --------------------------------

  return (
    <div className={s.container}>
      <div className={s.chatlog}>
        <span onClick={handleLoadMessages}>load more messages</span>
        {chat.messages.length > 0 &&
          chat.messages.map((el, i) => (
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
