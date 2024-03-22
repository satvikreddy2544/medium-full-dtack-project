import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSingleBlog } from '../hooks/useSingleBlog';
import FullBlog from './FullBlog';
import BlogSkeleton from './BlogSkeleton';
import Appbar from './Appbar';

interface blogType {

        title: string,
        content: string,
        author: {
            username: string
        }
}
const Blog = () => {

  const {id} = useParams();
  const {loading,blog} = useSingleBlog({
    id:id ||"",
  });
  const [blogData,setBlogData] = useState<blogType>();

  useEffect(()=>{

      if(blog) {
        setBlogData(blog);
      }
  },[blog])

  const arr = [1,2,3,4,5,6,7];
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
      {
        blogData && 
        <FullBlog  id={12} title={blogData.title}  author={blogData.author} content={blogData.content}  />
        
      }    
    </div>
  )
}

export default Blog
