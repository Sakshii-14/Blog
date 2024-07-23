import React from "react";
import service from "../appwrite/config.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, PostForm } from "../components/Index.jsx";
function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    service.getPost(slug).then((Post) => {
      if (Post) {
        setPost(Post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);
  return (
    <Container>
      {post ? (
        <div>
          <PostForm post={post} />
        </div>
      ) : null}
    </Container>
  );
}

export default EditPost;
