import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, RTE,Input } from "../Index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    try 
    {
      if (post) {
        console.log(post)
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
        console.log("userdata",userData)
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) {
          data.featuredImage = file.$id;
          console.log("data inside form",data)
          const dbpost = await service.createPost({
            ...data,
            userId: userData.$id,
          });
          if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
          }
        }
      }
    } catch (error) 
    {
      throw Error(error)
    }
  }

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
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    );
  
}
export default PostForm;
