import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

function App() {
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState([]);
  console.log("CHAT", chat);

  const socketOn = () => {
    if (socket) {
      socket.on("message", (message) => {
        setChat([...chat, message]);
      });
    }
  };

  socketOn();

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // -------------------- FORM ----------------------------------

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("DATA", data);

    //emit message to server
    socket.emit("chatMessage", data.message);
    reset();
  };

  return (
    <div className="App">
      CHAT ROOM APP
      <div>
        <p>CHAT LOG</p>
        {chat.length > 0 &&
          chat.map((el, i) => (
            <div key={i}>
              <p>{el.username}</p>
              <p>{el.text}</p>
              <p>{el.time}</p>
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
}

export default App;
