import React from "react";
import { useState } from "react";
import { Chat } from "../Chat/Chat";
import { Nav } from "../Nav/Nav";
import { ChatRooms } from "../ChatRooms/ChatRooms";
import s from "./Home.module.css";
import { AllRooms } from "../AllRooms/AllRooms";

export const Home = () => {
  const [showChat, setShowChat] = useState(true);
  const [showRooms, setShowRooms] = useState(false);

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
            <ChatRooms />
          </div>
          <div className={s.chat}>
            <Chat />
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
