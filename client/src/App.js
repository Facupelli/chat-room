import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

function App() {
  const [socket, setSocket] = useState(null);
  // console.log(socket)

  const socketOn = () => {
    if (socket) {
      socket.on("message", (message) => {
        console.log(message);
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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('DATA',data);

    //emit message to server
    socket.emit("chatMessage", data.message);
  };


  return (
    <div className="App">
      CHAT ROOM APP
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
