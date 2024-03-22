import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../components/constants"
interface Blog {

            id: number,
            title: string,
            content: string,
            author: {
                username: string
            }
}
const useBlogs = () =>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem('token')
    useEffect(()=>{
        getBulkBlogs();
    },[])

    const getBulkBlogs = async()=>{

        try{
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers:{
                    Authorization:`Bearer`+' '+token
                }
            });
    
            console.log(res.data.res);
            setBlogs(res.data.res);
            setLoading(false)
        }
        catch(e){

            console.log(`error occred while fetching all blogs`)
        }
    }

    return{
        loading,
        blogs
    }


};


export default useBlogs;