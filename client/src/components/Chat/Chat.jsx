import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./Chat.module.css";
import { Nav } from "../Nav/Nav";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRef } from "react";

export const Chat = ({ socket, currentRoom, chat, setChat }) => {
  const username = useSelector((state) => state.user.username);
  const userId = localStorage.getItem("userId");

  const [totalRows, setTotalRows] = useState("");
  const [loadPetitions, setLoadPetitions] = useState(0);

  //SCROLL TO BOTTOM OF MESSAGES --------------------------

  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scroll({ behavior: "smooth" });
  };

  //LOAD CHAT MESSAGES ------------------------

  useEffect(() => {
    if (currentRoom.roomName.length > 0) {
      axios
        .get(
          `/chatmessage?roomId=${currentRoom.roomId}&roomName=${currentRoom.roomName}`
        )
        .then((res) => {
          // setChat({
          //   messages: chat.messages.concat(res.data.rows),
          // });
          setTotalRows(res.data.count);
        });
    }
  }, [currentRoom]);

  //SOCKET ----------------------------------------

  const socketOn = () => {
    if (socket) {
      socket.on("message", (message) => {
        setChat({ messages: [...chat.messages, message] });
      });
      // scrollToBottom();
      return () => socket.off();
    }
  };

  useEffect(() => {
    socketOn();
  }, [chat]);

  //handleLoadMessages -----------------------------
  const handleLoadMessages = async () => {
    const pageNumber = Math.floor(totalRows / 10);

    console.log(pageNumber, loadPetitions);

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

  useEffect(() => {
    setLoadPetitions(0);
  }, [currentRoom]);

  // -------------------- SCROLL TO BOTTOM --------------------------------

  // -------------------- FORM ----------------------------------

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const message = watch("message");

  const onSubmit = async (data) => {
    try {
      console.log("DATA", data);
      const messageInfo = {
        username,
        text: data.message,
        room: currentRoom.roomName,
        userId,
        roomId: currentRoom.roomId,
      };

      const response = await axios.post("/chatmessage", messageInfo);

      //emit message to server
      socket.emit("chatMessage", data.message);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.chatlog}>
        <span onClick={handleLoadMessages} className={s.loadMessages}>
          load more messages
        </span>
        {chat.messages.length > 0 &&
          chat.messages.map((el, i) => (
            <div
              key={i}
              className={el.username === username ? s.mineMessage : s.message}
            >
              <div className={s.content}>
                <p className={s.username}>{el.username}</p>
                <p className={s.text}>{el.text}</p>
                <p className={s.time}>{el.time}</p>
              </div>
            </div>
          ))}
        {/* <div ref={divRef}></div> */}
        {/* <AlwaysScrollToBottom chat={chat}/> */}
      </div>
      {currentRoom.roomName.length > 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formContainer}>
            <input {...register("message")} className={s.messageInput} />
            <input
              type="submit"
              className={s.button}
              disabled={message ? false : true}
            />
          </div>
        </form>
      )}
    </div>
  );
};

const AlwaysScrollToBottom = ({chat}) => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView()
  },[chat]);
  return <div ref={elementRef} />;
};
