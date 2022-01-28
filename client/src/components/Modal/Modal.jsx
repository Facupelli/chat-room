import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./Modal.module.css";

export const Modal = ({ setModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setModal(false);
  };

  return (
    <div className={s.container}>
      <div className={s.container2}>
        <div className={s.content}>
          <div className={s.message}>
            <p className="text-lg font-semibold">CREATE NEW ROOM</p>
          </div>
          <div className={s.form}>
            <form>
              <label>Room Name</label>
              <input type="text" />
            </form>
          </div>
          <div className={s.buttonContainer}>
            <button
              className={s.button}
              onClick={handleClick}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
