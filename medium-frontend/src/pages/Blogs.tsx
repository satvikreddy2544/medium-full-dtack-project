import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Blogcard from "../components/Blogcard";
import useBlogs from "../hooks/useBlogs";
import Appbar from "../components/Appbar";
import BlogSkeleton from "../components/BlogSkeleton";
export interface Blog{
  id:number,
  title:string,
  content: string,
  author: {
      username:string
  }
}
const Blogs = () => {
  const navigate = useNavigate();
  const [allBlogs,setAllBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) {
      navigate("/login");
    }
  }, []);
  const {loading,blogs} = useBlogs();
  useEffect(() => {
    if (blogs.length > 0) {
      setAllBlogs(blogs);
    }
  }, [blogs]);

  const arr = [1,2,3,4,5,6];

  
  
  if(loading){
    return (
    <div>
      <div>
        <Appbar  name={""}/>
      </div>
      <div className="flex flex-col gap-3">
    {
      arr.map(()=> <BlogSkeleton/>)
    }
  </div>
  </div>
    )
    
  }
 
  return (
    <div>
      <div>
        <Appbar name={blogs[0].author.username}/>
      </div>
      <div>
        {
          allBlogs.map((blog)=> <Blogcard id={blog.id}  authorName={blog.author.username} title={blog.title} content={blog.content} date="2 march 2024" key={blog.id}/>)
        }
      </div>
    </div>
  );
};

export default Blogs;
