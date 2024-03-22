import { useContext, useState } from "react";

import { SignUpInput, SigninInput } from "medium_backend_common_new";
import InputBox from "../components/InputBox";

import LoginContext from "../components/LoginContext";

import axios from "axios";
import { BACKEND_URL } from "../components/constants";
import { useNavigate } from "react-router-dom";


const Signin = () => {
  
  const [inputs, setInputs] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignin = async()=>{

      try{
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,inputs)
        const {token} = res.data;
        localStorage.setItem('token',token);
        navigate('/blog')
        console.log(res);
      }catch(e){

        alert('error occcures during signup')
      }
  }

  const {setText} = useContext(LoginContext)
  return (
    <div className="flex flex-col h-screen w-full justify-center ml-4 items-center gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-center">Create a account</h1>
        <h1 className="text-lg text-gray-400">Do not have account <span onClick={()=>setText("signup")} className="underline cursor-pointer">Signup
        </span></h1>
      </div>
      <div className="flex flex-col w-[80%] gap-5">
        <InputBox
          placeholder="enter your name"
          label="first name"
          
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputs((c:SigninInput) => ({
              ...c,
              name: e.target.value,
            }))
          }
        />
        <InputBox
          placeholder="enter your email"
          label="email"
          
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputs((c:SigninInput) => ({
              ...c,
              username: e.target.value,
            }))
          }
        />
        <InputBox
          placeholder="enter your password"
          label="password"
         
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputs((c:SigninInput) => ({
              ...c,
              password: e.target.value,
            }))
          }
        />
        <div>
        <button className="w-full border border-black p-3 rounded-lg font-extrabold text-xl bg-blue-950 text-white"
        onClick={handleSignin}>Sign in</button>
      </div>
      </div>
      
    </div>
  );
};

export default Signin;
