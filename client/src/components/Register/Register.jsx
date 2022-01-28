import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

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
      const user = {
        userImg: "",
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
        email: data.email,
      };
      console.log(data);
      const response = await axios.post("/register", data);
      console.log("RESPONSE:", response);
      reset();
      // navigate("/home");
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <>
      <div className="">
        <div onClick={handleGoBack}></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>Register</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="name"
                {...register("name")}
                required
              />
              <span>{errors && errors.name?.message}</span>

              <input
                type="text"
                placeholder="lastname"
                {...register("lastname")}
                required
              />
              <span>{errors && errors.lastname?.message}</span>

              <input
                type="text"
                placeholder="email"
                {...register("email")}
                required
              />
              <span>{errors && errors.email?.message}</span>

              <input
                type="text"
                placeholder="username"
                {...register("username")}
                required
              />
              <span>{errors && errors.username?.message}</span>

              <input
                type="password"
                placeholder="password"
                {...register("password")}
                required
              />
              <span>{errors && errors.password?.message}</span>
            </div>

            <div className="">
              <button type="submit">REGISTER</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
