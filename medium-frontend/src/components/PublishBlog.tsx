import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar";

const PublishBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [isEmpty,setIsEmpty] = useState(false);

  const handleOnClick = async () => {
    if(title.length > 0 && content.length > 0){
        setIsEmpty(true);
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/blog/post`,
      {
        title,
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 200) {
      setOk(true);
      setTimeout(() => {
        navigate("/blog");
      }, 1000);
    } else {
      console.log("error occured while posting");
    }
}else{
    setIsEmpty(true);
    setTimeout(()=>{
        setIsEmpty(false)
    },10000)
    console.log('title and content should not be empty')
}
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-14 ">
        
      <div>
        {ok === true ? (
          <h1 className="bg-green-300 p-3 rounded-md">Blog added succesfully</h1>
        ) : null}
        {
            isEmpty === true ? <h1 className="bg-red-300 p-3 rounded-md">Title and content cannot be empty</h1> : null
        }
      </div>
      <div className="w-[40%] flex flex-col gap-2">
        <div className="font-semibold">Title:</div>
        <input
          type="text"
          placeholder="enter your title"
          onChange={(e) => setTitle(e.target.value)}
          className="border border-black w-full p-2 rounded-lg"
        />
      </div>
      <div className="w-[40%] ">
        <label className="block mb-2  text-gray-900 font-semibold ">
          Your content:
        </label>
        <textarea
          id="message"
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   "
          placeholder="Write your thoughts here..."
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={handleOnClick}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PublishBlog;
