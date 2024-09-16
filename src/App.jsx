
import React from "react";
import { useState, useEffect } from "react";
import authService from "./appwrite/Auth";
import { useDispatch,useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header,Footer } from "./components/Index";
import { useNavigate } from "react-router-dom";


 
export default function App() {
  const navigate=useNavigate()
  const authStatus=useSelector((state)=>state.auth.status)
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          if(userData)navigate('/home')
            
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  return !loading ? <div  className={`flex flex-col min-h-screen `} 
  style={!authStatus ? { backgroundImage: 'url(/assets/bgimg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' } : {backgroundImage: 'url(/assets/bgimg1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
    
    
    <Header></Header>
    <div className="flex-1">
    <Outlet></Outlet>
    </div>
    {authStatus&&<Footer></Footer>}
    
    </div> : null;
}
