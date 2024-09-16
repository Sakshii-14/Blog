import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, RTE,Input } from "../Index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";




function PostForm({ post }) {
  
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const loadingbarref=useRef(null)
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    loadingbarref.current.continuousStart()
    try 
    {  
      if (post) {
        
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
          
        if (file) {
          await service.deletefile(post.featuredImage);
        }
        const dbpost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      } else 
      {
        
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) {
          data.featuredImage = file.$id;
          
          const dbpost = await service.createPost({
            ...data,
            userId: userData.$id,
            username:userData.name,
          });
          if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
          }
        }
      }
      loadingbarref.current.complete()
    } catch (error) 
    {
      
      throw Error(error)
    }
  }
  const notify=(error)=>toast(`${error}`,{
    style: {
      backgroundColor: "#ab8bde", 
      color: "white", 
    },
    progressStyle: {
      backgroundColor: "#381372", 
    },
  })

    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string") {
        return value.toLowerCase().replace(/\s+/g, "-");
      }
      return "";
    }, []);
    React.useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }, [watch, setValue, slugTransform]);

    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
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
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={service.getfilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["Active", "Inactive"]}
            label="Status :"
            className="mb-4 text-[#53279b] sm:text-[1.1rem] text-[1rem]"
            {...register("status", { required: true })}
            
          />
          <Button
            type="submit"
            bgColor={post ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-yellow-500" : "bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-500"}
            className={`w-full flex justify-center items-center gap-4 text-[1.2rem] ${post ? 'hover:bg-gradient-to-r hover:from-yellow-400 hover:via-green-500 hover:to-teal-500' : 'hover:bg-gradient-to-r hover:from-cyan-600 hover:via-sky-500 hover:to-blue-800'}`}
          >
            {post ? "Update" : "Submit"}
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Symbols/Check%20Box%20With%20Check.webp" alt="Check Box With Check" width="30" height="30" />
          </Button>
        </div>
      </form>
    );
  
}
export default PostForm;
