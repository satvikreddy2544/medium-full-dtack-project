import { SignUpInput } from "medium_backend_common_new";
import { useContext, useState } from "react";
import InputBox from "../components/InputBox";
import LoginContext from "../components/LoginContext";
import axios from "axios";
import { BACKEND_URL } from "../components/constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupInputs, setSignupInputs] = useState<SignUpInput>({
    username: "",
    password: "",
  });

  const {setText} = useContext(LoginContext)
  const navigate = useNavigate();
  const handleSignup = async()=>{

      try{

        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,signupInputs)
        const {token}  = res.data;
        localStorage.setItem('token',token);
        navigate('/blog')
      }catch(e){

        alert(`error occured while login`)
      }
  }
  return (
    <div className="flex flex-col h-screen w-full justify-center ml-4 items-center gap-4">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-extrabold text-center">Login Page</h1>
      <h1 className="text-lg text-gray-400">Already have an account <span  
      className="underline cursor-pointer" onClick={()=>setText("signin")}>Signin
      </span></h1>
    </div>
    <div className="flex flex-col w-[80%] gap-5">
      <InputBox
        placeholder="enter your email or username"
        label="first name"
        
        onchange={(e) =>
          setSignupInputs((c:SignUpInput) => ({
            ...c,
            username: e.target.value,
          }))
        }
      />
      
      <InputBox
        placeholder="enter your password"
        label="password"
       
        onchange={(e) =>
          setSignupInputs((c:SignUpInput) => ({
            ...c,
            password: e.target.value,
          }))
        }
      />
      <div>
      <button className="w-full border border-black p-3 rounded-lg font-extrabold text-xl bg-blue-950 text-white"
      onClick={handleSignup}>Sign Up</button>
    </div>
    </div>
    
  </div>
  );
};

export default Signup;
