import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./AllRooms.module.css";

export const AllRooms = () => {
  const rooms = useSelector((state) => state.rooms);

  return (
    <div className={s.container}>
      {rooms &&
        rooms.map((el, i) => (
          <div key={i} className={s.block}>
            <div className={s.title}>
              <p className={s.room_name}>{el.name}</p>
              <p className={s.username}>{el.user.username}</p>
            </div>
            <p>{el.description}</p>
          </div>
        ))}
    </div>
  );
};
