import React from "react";
import service from "../appwrite/config.js";
import { Link } from "react-router-dom";
import '../styles/card.css'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="flex flex-col py-4 relative overflow-hidden items-center gap-4 blurbgimg  rounded-xl px-3 w-full hover:shadow-inner hover:shadow-[#8b5fa8] shadow-2xl shadow-current  hover:scale-[1.04] transition-all ease-in duration-300 h-full overlay ">
        <div className="absolute bottom-[8px] left-0 h-full w-full bg-gradient-to-br from-[#6a11cb] via-[#9f25fc] to-[#ff00ff] z-0 translate-y-[100%] overlaydiv transition-all duration-500 ease-out"></div>
        <div className="w-full h-[50vh] flex-grow z-10">
         <img src={ service.getfilePreview(featuredImage)} alt={title} className='rounded-xl h-full w-full object-cover ' />
        </div>
        <h2 className="text-xl font-bold flex-shrink-0 z-10 text-[#421d7e]">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
