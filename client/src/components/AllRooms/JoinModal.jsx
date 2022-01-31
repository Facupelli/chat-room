import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import s from "./JoinModal.module.css";

export const JoinModal = ({
  setModal,
  setShowChat,
  showChat,
  setShowRooms,
  showRooms,
  roomIndex
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const socket = useSelector(state => state.socket)

  console.log(roomIndex)

  const handleNoClick = () => {
    setModal(false);
  };

  const handleYesClick = async() => {
    const postInfo = {
      roomId: roomIndex.roomId,
      userId: roomIndex.userId
    }

    const response = await axios.post("/roomsjoined", postInfo);

    setShowRooms(!showRooms);
    setShowChat(!showChat);
    // await socket.emit('joinRoom', roomIndex)
  };

  return (
    <div className={s.container}>
      <div className={s.container2}>
        <div className={s.content}>
          <div className={s.message}>
            <p className="text-lg font-semibold">
              Are you sure you want to join this room?
            </p>
          </div>
          <div className={s.buttonContainer}>
            <button className={s.button} onClick={handleYesClick}>
              YES
            </button>
            <button className={s.no_button} onClick={handleNoClick}>
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
