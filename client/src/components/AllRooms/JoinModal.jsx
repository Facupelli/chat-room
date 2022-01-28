import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./JoinModal.module.css";

export const JoinModal = ({
  setModal,
  setShowChat,
  showChat,
  setShowRooms,
  showRooms,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNoClick = () => {
    setModal(false);
  };

  const handleYesClick = () => {
    setShowRooms(!showRooms);
    setShowChat(!showChat);
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
