import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/Auth.js";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {Logo,Input,Button} from './Index'
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");
  const create = async (data) => {
    seterror("");
    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        navigate("/home")
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="text"
              label="Full Name :"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              type="email"
              label="Email :"
              placeholder="Enter email "
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full"
              children="Sign In"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
