
import React from "react";
import { useState, useEffect } from "react";
import authService from "./appwrite/Auth";
import { useDispatch,useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header,Footer } from "./components/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

 
export default function App() {
  const authStatus=useSelector((state)=>state.auth.status)
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  return !loading ? <div>
    
    
    <Header></Header>
    <Outlet></Outlet>
    {authStatus&&<Footer></Footer>}
    
    </div> : null;
}
