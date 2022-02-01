import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./ChatRooms.module.css";

export const ChatRooms = () => {
  const rooms_joined = useSelector((state) => state.rooms_joined);
  console.log('rooms_joined',rooms_joined)

  return (
    <div className={s.container}>
      <p>Rooms</p>
      <div>
        {rooms_joined &&
          rooms_joined.map((el, i) => (
            <div
              key={i}
              className={s.block}
            //   onClick={() => handleClick(el.name, el.user.username, el.id)}
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
