import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config.js";
import parse from 'html-react-parser'
import {Container,Button} from '../components/Index'
import { Link } from "react-router-dom";
import '../components/Header/navbutton.css'
import './content.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import Loader from "../components/Loader.jsx";
import { motion } from 'framer-motion';

function Post() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const loadingbarref=useRef(null)
  const { slug } = useParams();
  const [post, setPost] = useState();
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const fetchPost = async () => {
      setloading(true);
      try {
        const post = await service.getPost(slug);
        if (post) {
          setPost(post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        notify(error);
      } finally {
        setloading(false);  
      }
    };
  
    fetchPost();
  }, [slug]);
  
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const deletePost = async () => {
    loadingbarref.current.continuousStart()
    try {
      const file = await service.deletefile(post.featuredImage);
      if (file) {
        await service.deletePost(slug);
        navigate("/home");
      }
      loadingbarref.current.complete()
    } catch (error) {
      notify(error);
      console.error("Error :", error);
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
  if(loading)
  {
    return (<Container>
      <div className="w-full flex justify-center items-center h-full p-4 mb-4">
      <Loader/>
        </div> 
    </Container> ) 
  }

  else return post ? (
    <div className="py-8 ">
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
<Container>
        <motion.div initial={{ opacity: 0, x: -100 }}  
             animate={{ opacity: 1, x: 0 }}     
             exit={{ opacity: 0, x: 100 }}      
             transition={{  type: 'spring',  
              stiffness: 150,  
              damping: 30,     
              duration: 0.7,   
              delay: 0.2  ,mass:0.5, bounce:0.5}} className="w-full h-full flex justify-center mb-4 relative  rounded-xl p-2 bg-[#D6C9F1]">
          <img
            src={service.getfilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl object-cover h-full w-full"
          />
         
          {isAuthor && (
            <div className="absolute flex flex-col gap-3 right-6 top-6 sm:w-[20%] w-auto">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-500 " className="flex gap-2 justify-center w-full items-center  hover:bg-gradient-to-r hover:from-teal-400 hover:via-lime-500 hover:to-emerald-500 font-bold">
                <i className="fa-solid fa-pen-to-square fa-beat-fade"></i>
                  Edit
                  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Memo.webp" alt="Memo" width="30" height="30" />
                </Button>
              </Link>
              <Button bgColor="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" className="flex gap-2 justify-center w-full items-center font-bold hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600  hover:to-pink-600"  onClick={deletePost}>
              <i className="fa-solid fa-trash fa-beat-fade fa-sm" ></i>
                Delete
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Symbols/Cross%20Mark.webp" alt="Cross Mark" width="30" height="30" />
              </Button>
            </div>
          )}
        </motion.div>
        <div className="flex flex-col blurbg rounded-xl gap-2 w-full p-2 ">
        <div className="w-full mb-6 underline underline-offset-8 decoration-[#ab8bde] ">
          <h1 className="text-2xl font-bold text-[#53279b]">{post.title}</h1>
        </div>
        <div className="content-display mb-1 ">{parse(post.content)}</div>
        <h1 className="text-[1rem] font-bold text-[#53279b]">Created By :   <span className="text-[#745b9b] text-[1rem]">{post.username}</span></h1>
        </div>

        
      </Container>
      
    </div>
  ) : null;
}

export default Post;
