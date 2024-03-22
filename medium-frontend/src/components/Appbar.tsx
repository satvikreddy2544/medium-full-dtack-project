
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar'
import { useState } from 'react';

const Appbar = ({name}:{name:string}) => {
    const navigate  = useNavigate();
    const [clicked,setClicked] = useState(false)

  const handleOnClick = ()=>{

    navigate('/publish');

  }

  const navigateBlog = ()=>{
    navigate('/blog')
  }
  const handleLogout = ()=>{

    localStorage.setItem('token',"");
    navigate('/login')
  }
  
  return (
    <div className='bg-slate-300 p-2'>
      <div className='flex justify-between max-w-7xl m-auto'>
            <div className='font-bold text-2xl cursor-pointer' onClick={navigateBlog}>
                Medium
            </div>
            <div className='flex gap-3 items-center'>
               <button className='bg-green-300 p-2 w-[80%] rounded-lg font-semibold' onClick={handleOnClick}>
                    +Add
               </button>
            <div className='flex flex-col'>
            <div className='cursor-pointer' onClick={() => setClicked(!clicked)}>
                    <Avatar name={name} />
                    
               </div>
               <div className='block'>
                        {
                            clicked && <h1 className='bg-red-300 cursor-pointer' onClick={handleLogout}>Logout</h1>
                        }
                    </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Appbar
