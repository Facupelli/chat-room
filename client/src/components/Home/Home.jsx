import React from "react";
import { Chat } from "../Chat/Chat";
import { Nav } from "../Nav/Nav";
import { Rooms } from "../Rooms/Rooms";
import s from './Home.module.css'

export const Home = () => {
  return (
    <div>
      <Nav />
      <div className={s.container}>
        <div className={s.rooms}>
          <Rooms />
        </div>
        <div className={s.chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
};
