import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import './navbutton.css'
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";

function LogoutBtn({className=''}) {
  const loadingbarref=useRef(null)
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const logoutHandler = () => {
    loadingbarref.current.continuousStart()
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        loadingbarref.current.complete()
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return(
    <>
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
      <button 
  className={`inline-block px-4 py-2 duration-200  bg-[#F7CACD]  rounded-xl glow-btn ${className}`} onClick={logoutHandler}>
    Logout</button>
    </>
  ) 
}

export default LogoutBtn;
