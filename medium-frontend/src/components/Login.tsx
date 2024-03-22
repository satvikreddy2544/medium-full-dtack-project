import React, { useEffect } from "react";
import Quote from "./Quote";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import { useNavigate } from "react-router-dom";

const Login = ({ type }: { type: string}) => {
  const navigate = useNavigate();
  useEffect(()=>{

    const token = localStorage.getItem('token');
    console.log(token)
   
    if(token){
      navigate('/blog')
    }
  },[])
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      
      <div>{type === "signin" ? <Signin /> : <Signup />}</div>
      <div>
        <Quote />
      </div>
    </div>
  );
};

export default Login;
