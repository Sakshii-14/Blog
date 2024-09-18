import React from "react";
import { useState,useEffect } from "react";
import service from "../appwrite/config.js";
import { Container,PostCard } from "../components/Index.jsx";
import { motion } from 'framer-motion';
import Loader from "../components/Loader.jsx";



function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

      useEffect(() => {
        setLoading(true);
    const fetchPosts = async () => {
      try {
        const posts = await service.listPosts();
        if (posts) {
          setPosts(posts.documents);
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8 ">
    <Container className=" min-w-full">
      {loading ? (
        <Loader/>
      ) : (
        <>
          {posts.length > 0 ? (
             <motion.div 
             initial={{ opacity: 0, x: -100 }}  
             animate={{ opacity: 1, x: 0 }}     
             exit={{ opacity: 0, x: 100 }}      
             transition={{  type: 'spring',  
              stiffness: 150,  
              damping: 30,     
              duration: 0.7,   
              delay: 0.2  ,mass:0.5, bounce:0.5}} 
            className="flex gap-6 flex-wrap w-full ">
              {posts.map((item) => (
                <div key={item.$id} className=" lg:w-[45%] md:w-[45%] sm:w-[40%] w-full">
                  <PostCard {...item} />
                </div>
              ))}
            </motion.div>
          ) : (
            <p>No Posts Available</p>
          )}
        </>
      )}
    </Container>
  </div>
);
}

export default Home;
