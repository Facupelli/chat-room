import React from "react";
import { useState } from "react";
import { Chat } from "../Chat/Chat";
import { Nav } from "../Nav/Nav";
import { ChatRooms } from "../ChatRooms/ChatRooms";
import s from "./Home.module.css";
import { AllRooms } from "../AllRooms/AllRooms";
import { useEffect } from "react";
import {io} from "socket.io-client";


export const Home = () => {
  const [showChat, setShowChat] = useState(true);
  const [showRooms, setShowRooms] = useState(false);

  const [socket, setSocket] = useState(null);
  // const socket = useSelector(state => state.socket)

  // const socket = io();
  console.log('SOCKET', socket)

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const [currentRoom, setCurrentRoom] = useState('')

  return (
    <div>
      <Nav
        setShowChat={setShowChat}
        showChat={showChat}
        setShowRooms={setShowRooms}
        showRooms={showRooms}
      />
      {showChat && (
        <div className={s.container}>
          <div className={s.rooms}>
            <ChatRooms socket={socket} setCurrentRoom={setCurrentRoom} />
          </div>
          <div className={s.chat}>
            <Chat socket={socket} currentRoom={currentRoom} />
          </div>
        </div>
      )}
      {showRooms && (
        <div className={s.container}>
          <div className={s.allRooms}>
            <AllRooms
              setShowChat={setShowChat}
              showChat={showChat}
              setShowRooms={setShowRooms}
              showRooms={showRooms}
            />
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};
