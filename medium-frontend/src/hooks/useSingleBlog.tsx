
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../components/constants";

export interface Blog {

    id: number,
    title: string,
    content: string,
    author: {
        username: string
    }
}
export const useSingleBlog = ({id}:{id:string})=>{

    const [blog,setBlog] = useState<Blog>()
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{

        getBlog();
    },[]);

    const token = localStorage.getItem('token');


    const getBlog = async()=>{

        try{
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/getBlog/${id}`,{
                headers:{
                    Authorization:'Bearer'+" "+token,
                }
                });
            console.log(res);
            setBlog(res.data.res);
            setLoading(false)
        }
        catch(e){
            console.log(`error occured while fetching blof ${id}`);
        }

        

    }

    return {
        loading,
        blog
    }
}