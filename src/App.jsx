
import React from "react";
import { useState, useEffect } from "react";
import authService from "./appwrite/Auth";
import { useDispatch,useSelector } from "react-redux";
import { login, logout,promptDismiss } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header,Footer, Login } from "./components/Index";
import { useNavigate } from "react-router-dom";
import './styles/prompt.css'
import { motion } from 'framer-motion';

 
export default function App() {
  const navigate=useNavigate()
  const authStatus=useSelector((state)=>state.auth.status)
  const showprompt=useSelector((state)=>state.auth.showPrompt)
  const [loading, setloading] = useState(true);
  
  const dispatch = useDispatch();
  useEffect(() => {  
        setloading(false);
  }, []);

  const handleloginclick=()=>{
    dispatch(promptDismiss());
    
  }

  return !loading ? <div  className={`flex flex-col min-h-screen `} 
  style={!authStatus ? { backgroundImage: 'url(/assets/bgimg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' } : {backgroundImage: 'url(/assets/bgimg1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
    
    
    <Header onloginclick={handleloginclick}></Header>
    
    <div className="flex-1 relative">
    {!authStatus && showprompt && (
          <motion.div initial={{ opacity: 0, x: -100 }}  
          animate={{ opacity: 1, x: 0 }}     
          exit={{ opacity: 0, x: 100 }}      
          transition={{  type: 'spring',  
           stiffness: 150,  
           damping: 30,     
           duration: 0.7,   
           delay: 0.2  ,mass:0.5, bounce:0.5}}  className="absolute inset-0 flex items-center justify-center">
            <div className="sm:h-[60%] sm:w-[50%] h-auto w-auto m-4 flex flex-col items-center justify-center sm:gap-[4rem] gap-8 rounded-2xl prompt-bg  " >
              <p className="gradient-text-large sm:text-[2rem] text-[1.5rem] text-center font-bold text-wrap ">Step in and start building your blog empire... 
              </p>
              <p className="gradient-text-large text-wrap text-center sm:text-[2rem] text-[1.5rem] font-bold ">Your Words Await... !!</p>
            </div>
          </motion.div>
        )}
      <Outlet></Outlet>
    </div>
    {authStatus&&<Footer></Footer>}
    
    </div> : null;
}
