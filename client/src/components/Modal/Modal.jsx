import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import s from "./Modal.module.css";
import { getRooms } from "../../redux/actions/actions";
import axios from "axios";

export const Modal = ({ setModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("ERRORS:", errors);

  const onSubmit = async (data) => {
    try {
      const room = {
        name: data.name,
        description: data.description,
        userId,
      };
      console.log(data);
      const response = await axios.post("/room", room);
      await dispatch(getRooms());
      console.log("RESPONSE:", response);
      reset();
      setModal(false);
      // navigate("/home");
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.container2}>
        <div className={s.content}>
          <div className={s.message}>
            <p className="text-lg font-semibold">CREATE NEW ROOM</p>
          </div>
          <div className={s.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Room Name</label>
                <input type="text" {...register("name")} required />
              </div>

              <div className={s.description}>
                <label>Room Description</label>
                <textarea type="text" {...register("description")} />
              </div>

              <div className={s.buttonContainer}>
                <button className={s.button} type="submit">
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
