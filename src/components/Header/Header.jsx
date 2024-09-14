import React from "react";
import { Logo, Container, LogoutBtn } from "../Index.jsx";
import { Link } from "react-router-dom";
import './navbutton.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import hamicon from './burger-menu.png';
import { useState } from "react";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menu, setmenu] = useState(false);
  const navItems = [
    {
      name: "Home",
      slug: "/home",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const handleClick=()=>{
    setmenu(!menu);
  }
  return (
    <header className="py-3 w-full px-4 bg-[#3C1874]">
      
        <nav className="flex w-full justify-between relative items-center ">
          <div className="mr-4  w-auto px-2">
            <Link to="/home">
              <Logo></Logo>
            </Link>
          </div>
          <div className="hidden sm:block">
          <ul className="flex ml-auto w-auto items-center justify-around gap-3 ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block  px-4 py-2 duration-200 bg-[#F7CACD]  rounded-xl glow-btn "
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          </div>
         
           <img src={hamicon} alt="menu" className="h-[2.5rem] mr-3 sm:hidden block" onClick={handleClick} />       
           
  
           <div className={` p-4 z-10 sm:hidden block navbg absolute h-auto w-[40%] right-0 top-[3.5rem]  ${menu ? 'translate-y-[0] ':'translate-y-[-200%]'} rounded-lg transition-all duration-300 ease-in`}>
            <ul className="flex flex-col w-full items-center justify-around gap-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full">
                  <button
                    className="inline-block w-full px-4 py-2 duration-200 bg-[#F7CACD]  rounded-xl glow-btn  "
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="w-full">
                <LogoutBtn  className={'w-full'}/>
              </li>
            )}
          </ul>
            </div>
            
           
        </nav>
      
    </header>
  );
}

export default Header;
