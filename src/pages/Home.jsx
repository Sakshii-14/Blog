import React from "react";
import { useState,useEffect } from "react";
import service from "../appwrite/config.js";
import { Container,PostCard } from "../components/Index.jsx";
import { useSelector } from "react-redux";


function Home() {
  const [posts, setPosts] = useState([])
  const userdata=useSelector((state)=>state.auth.userData)
  
    useEffect(() => {
        service.listPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

  return (
<div className="w-full py-8">
    <Container>
        {posts.length>0?
        <div className="flex flex-wrap">
          {
            posts.map((item) => (
              <div key={item.$id}>
                <PostCard
                  {...item}
                />
              </div>
            ))
           }
      
        </div>
      :"No Posts Available"}
    </Container>
  </div>
  )
    
}

export default Home;
