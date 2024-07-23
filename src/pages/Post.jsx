import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config.js";
import parse from 'html-react-parser'
import {Container,Button} from '../components/Index'
import { Link } from "react-router-dom";
function Post() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    service.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      }
    });
  }, []);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const deletePost = async () => {
    try {
      const file = await service.deletefile(post.featuredImage);
      if (file) {
        await service.deletePost(slug);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getfilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
