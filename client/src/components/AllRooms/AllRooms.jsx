import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./AllRooms.module.css";
import { JoinModal } from "./JoinModal";

export const AllRooms = ({
  setShowChat,
  showChat,
  setShowRooms,
  showRooms,
}) => {
  const rooms = useSelector((state) => state.rooms);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(true);
  };

  return (
    <>
      <div className={s.container}>
        {rooms &&
          rooms.map((el, i) => (
            <div key={i} className={s.block} onClick={handleClick}>
              <div className={s.title}>
                <p className={s.room_name}>{el.name}</p>
                <p className={s.username}>{el.user.username}</p>
              </div>
              <p>{el.description}</p>
            </div>
          ))}
      </div>
      {modal && (
        <JoinModal
          setModal={setModal}
          setShowChat={setShowChat}
          showChat={showChat}
          setShowRooms={setShowRooms}
          showRooms={showRooms}
        />
      )}
    </>
  );
};
