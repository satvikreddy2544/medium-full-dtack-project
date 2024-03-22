import { useEffect, useState } from "react";
import { Blog } from "../hooks/useSingleBlog";
import Avatar from "./Avatar";
import Appbar from "./Appbar";


const FullBlog = ({ title, content, author }: Blog) => {
  const [username, setUsername] = useState("Anynomous");

  useEffect(() => {
    getUserName();
  }, []);

  
  const getUserName = () => {
    const name = author.username.split("@")[0];
    setUsername(name);
  };
  return (
   <div>
    <div>
        <Appbar name={username } />
    </div>
    
     <div className="flex   max-w-7xl m-auto mt-16">
      <div className="grid grid-cols-10  w-full gap-6">
        <div className="col-span-6 flex flex-col gap-3 ">
          <div className="">
            <div className="font-bold text-3xl">{title}</div>
            <div className="text-slate-400">posted on 02 dec 2024</div>
          </div>
          <div className="text-xl">
            {content}
            
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-3">
            <div>Author</div>
            <div className="flex gap-3 ">
              <div className="flex items-center">
                <Avatar name={username} />
              </div>
              <div className="">
                <div className="font-bold text-xl">{username}</div>
                <div>
                  Lorem ipsum d adipisicing elit. Neque delectus, quas tur est
                  voluptas culpa.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default FullBlog;
