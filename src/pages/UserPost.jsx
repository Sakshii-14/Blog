import React from "react";
import service from "../appwrite/config.js";
import { PostCard, Container } from "../components/Index.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import Loader from "../components/Loader.jsx";


function UserPost() {
  const {userid ,username} = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => { 
    setLoading(true);
    service.listPosts(userid).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false)
      }
    });
  }, []);
  return  (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}  
      animate={{ opacity: 1, x: 0 }}     
      exit={{ opacity: 0, x: 100 }}      
      transition={{  type: 'spring',  
        stiffness: 150,  
        damping: 20,     
        duration: 0.7,   
        delay: 0.2, 
        mass: 0.5 }}
      className="w-full py-8 page"
    >
      <Container className=" min-w-full">
        <p className="text-[#53279b] text-[1.5rem] font-medium mb-4">{username} 's Posts : </p>
        {
          loading ? (
            <Loader />
          ) : (
            posts  && posts.length > 0 ? (
              <motion.div  
                initial={{ opacity: 0, x: -100 }}  
                animate={{ opacity: 1, x: 0 }}     
                exit={{ opacity: 0, x: 100 }}      
                transition={{  
                  type: 'spring',  
                  stiffness: 150,  
                  damping: 30,     
                  duration: 0.7,   
                  delay: 0.2, 
                  mass: 0.5,
                  bounce: 0.5 
                }} 
                className="flex flex-wrap gap-6"
              >

                {posts.map((item) => (
                  <div key={item.$id} className="sm:w-[30%] w-full">
                    <PostCard {...item} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <p className="text-[1.1rem] text-[#3C1874] font-bold">No Posts Available</p>
            )
          )
        } 
      </Container>
    </motion.div>
  );
  

}

export default UserPost;
