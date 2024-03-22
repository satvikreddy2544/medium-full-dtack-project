import { useEffect } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
interface blogInput {
  authorName: string,
  date: string,
  title:string,
  content : string,
  id:number
}
const Blogcard = ({ authorName, date,title,content,id }: blogInput) => {
    useEffect(()=>{
        console.log("id is",id);
    },[])
  return (

   
    <div>
        
      <Link to={`/blog/${id}`}>  <div className=" max-w-screen-lg m-auto  border-b-2 border-black p-5">
            <div className="flex gap-2 text-gray-400">
                <div>
                    <Avatar name={"sai"}/>
                </div>
                <div>
                    {authorName}
                </div>
                <div>
                    {date}
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <div className="font-extrabold text-2xl">
                    {title}
                </div>
                <div className="text-lg font-semibold">
                    {content }
                </div>
            </div>
        </div>
        </Link>
        
    </div>
    
  );
};

export default Blogcard;
