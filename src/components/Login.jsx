import React ,{useRef, useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/Auth.js";
import { login as authLogin } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import { Button, Logo ,Input} from "./Index.jsx";
import { useForm } from "react-hook-form";
import LoadingBar from "react-top-loading-bar";
import '../styles/login.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");
  const loadingbarref=useRef(null)


  const login = async (data) => {
    seterror("");
    loadingbarref.current.continuousStart()
    try {
      const session = await authService.loginAccount(data);
      if (session) {
        navigate('/home')
        const userData = await authService.getCurrentUser();
        if (userData){
          dispatch(authLogin({ userData }));
        } 
      }
      
      loadingbarref.current.complete()
    } catch (error) {
      seterror(error.message);
      notify(error.message)
    }
  };
  const notify=(error)=>toast(`${error}`,{
    style: {
      backgroundColor: "#ab8bde", 
      color: "white", 
    },
    progressStyle: {
      backgroundColor: "#381372", 
    },
  })
  return (
    <motion.div initial={{ opacity: 0, x: -100 }}  
    animate={{ opacity: 1, x: 0 }}     
    exit={{ opacity: 0, x: 100 }}      
    transition={{  type: 'spring',  
     stiffness: 150,  
     damping: 30,     
     duration: 0.7,   
     delay: 0.2  ,mass:0.5, bounce:0.5}}  className="flex items-center justify-center w-full lg:mt-[7rem] md:mt-[5rem] sm:mt-[3rem] ">
      <LoadingBar
        className='shadow-md rounded-xl'
        color='#D6C9F1'
        ref={loadingbarref}
        height={4}
        shadow={true}
        transitionTime={2000}
        waitingTime={900}
        loaderSpeed={400}
        onLoaderFinished={() => console.log('Loading finished')}
      />
      <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition= {Bounce}/>
      <div
        className={`mx-auto w-full max-w-lg blur-bg rounded-xl p-10 `}
       >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl text-[#381372] font-bold leading-tight">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-base text-[#65439b]">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-[#381372] transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        
        
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email" 
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
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
              textColor="text-[#381372]"
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-200 hover:text-[ivory] sm:text-[1.1rem] text-[1rem] "
              children={'Login'}

            > 
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
