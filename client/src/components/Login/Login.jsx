import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../redux/actions/actions";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverResponse, setServerResponse] = useState();

  const handleGoBack = () => {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("ERRORS:", errors);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/login", data);
      console.log(response.data);
      const { token, id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      dispatch(setCookie(id))
      reset();
      navigate("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("SERVER RESPONSE", e.response?.data);
        setServerResponse(e.response?.data);
      }
    }
  };

  return (
    <div className="">
      <div onClick={handleGoBack}></div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Login</p>
          </div>

          <div>
            <input
              {...register("email")}
              type="text"
              placeholder="email"
              required
            />
            <span>{errors && errors.email?.message}</span>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              required
            />
            <span>
              {errors && errors.password?.message}
              {serverResponse && serverResponse.error}
            </span>
          </div>

          <div>
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};
