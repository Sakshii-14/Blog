import React from "react";
import { PostForm,  Container } from "../components/Index.jsx";


function AddPost() {

  return (
    <div className="py-8 ">
      <Container className=" min-w-full">
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
