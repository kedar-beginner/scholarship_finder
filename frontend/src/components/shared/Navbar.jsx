import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'

 
function Navbar() { 
    const {user} =useSelector(store=>store.auth);
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const  logOutHandeler =async()=>{
         try {
             const res =await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
             if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
             }
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
    }
  return (
    <div className='bg-white'>
        <div className='flex item-center justify-between mx-auto max-w-7xl h-16'>
            <div>
                 <h1 className='text-2xl font-bold'>scholarship<span className='text-[#F83002]'>Finder</span></h1>
            </div>
            <div className='flex items-center gap-12'>
                <ul className='flex font-medium items-center gap-5'>
                    {
                        user && user.role ==='donar'?(
                            <>
                                 <li><Link to={"/admin/companies"}>Companies/foundation</Link></li> 
                                 <li><Link to="/admin/scholarships">Scholarships</Link></li>
                            </>
                        ):(
                            <>
                                  <li><Link to={"/"}>Home</Link></li> 
                                  <li><Link to="/scholarships">For You</Link></li> 
                                  <li><Link to="/browse">Browse</Link></li> 
                            </>
                        )
                    }
                    
                </ul>
                  
                  {
                    !user?(
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant='outline'>Login</Button></Link>
                            <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#695292]'>Signup</Button></Link> 
                        </div>
                    ):(
                        <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage  className="w-12 h-12 rounded-full"  src={user?.profile?.profilePhoto ? user.profile.profilePhoto : "https://i.pinimg.com/736x/3b/73/48/3b73483fa5af06e3ba35f4f71e541e7a.jpg"}  alt="@shadcn" /> 
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-80 border border-gray-100 rounded-md shadow-xl'>
                            <div>
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage  className="w-12 h-12 rounded-full" src={user?.profile?.profilePhoto} alt="@shadcn" /> 
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>
                                           {user?.fullname}
                                        </h4>
                                        <p className='text-small text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div> 
                                </div>
                                <div className='flex flex-col my-2 text-grey-600'>
                                   {
                                    user && user.role==='student' &&(
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2/> 
                                        <Button variant='link'><Link to="/profile">view Profile</Link></Button> 
                                    </div>
                                    )
                                   } 
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut/> 
                                        <Button onClick={logOutHandeler} variant='link'>Logout</Button> 
                                    </div>
     
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    )
                  }
               
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
