import React from "react";
import service from "../appwrite/config.js";
import { PostCard, Container } from "../components/Index.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function AllPosts() {
  const userdata=useSelector((state)=>state.auth.userData)
  const [posts, setPosts] = useState([]);
  useEffect(() => { 
    service.listPosts(userdata.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
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
      </Container>
    </div>
  );
}

export default AllPosts;
