import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import {Input}  from '../ui/input'
import {RadioGroup} from '../ui/radio-group' 
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' 
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Signup() { 
    const [input,setInput]=useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        location:"",
        role:"",
        file:""
    });

    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler=(e)=>{
        setInput({...input,file:e.target.files?.[0]});
    }

    const navigate =useNavigate();
    const dispatch =useDispatch();
    const {loading,user}=useSelector(store=>store.auth);
    const submitHandeler =async(e)=>{
        e.preventDefault(); 
        try {
            dispatch(setLoading(true));
            const formData =new FormData();
            formData.append("fullname",input.fullname);
            formData.append("email",input.email);
            formData.append("phoneNumber",input.phoneNumber);
            formData.append("password",input.password);
             formData.append("location",input.location);
            formData.append("role",input.role);
            if(input.file){
                formData.append("file",input.file);
            }
            const res= await axios.post(`${USER_API_END_POINT}/register`,formData,{
               header:{"Content-Type":"multipart/form-data"} 
               ,withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.success(error.response.data.message);
        }finally{
              dispatch(setLoading(false));
         }
    }
            useEffect(()=>{
                 if(user){
                    navigate("/");
                 }
            },[]);
  return (
    <div>
       <Navbar/>
       <div className='flex items-center justify-center max-w-7xl mx-auto\'>
         <form onSubmit={submitHandeler} className='w-1/2 border border-b-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>
                 Sign Up
            </h1>
            <div className='my-2'>
                <Label>Full Name</Label>
                <Input
                 type="text"
                 value={input.fullname}
                 name="fullname"
                 onChange={changeEventHandler}
                 placeholder="Enter Your full Name"
                />
            </div>
            <div className='my-2'>
                <Label>Email</Label>
                <Input
                 type="email"
                 value={input.email}
                 name="email"
                 onChange={changeEventHandler}
                 placeholder="Enter Your Email"
                />
            </div>
            <div className='my-2'>
                <Label>Phone Number</Label>
                <Input
                 type="phonenumber"
                 value={input.phoneNumber}
                 name="phoneNumber"
                 onChange={changeEventHandler}
                 placeholder="Enter phone number"
                />
            </div>
            
            <div className='my-2'>
                <Label>Password</Label>
                <Input
                 type="password"
                 value={input.password}
                 name="password"
                 onChange={changeEventHandler}
                 placeholder="Enter password"
                />
            </div>
             <div className='my-2'>
                <Label>Location</Label>
                <Input
                 type="location"
                 value={input.location}
                 name="location"
                 onChange={changeEventHandler}
                 placeholder="Enter location"
                />
            </div>
            <div className='flex items-center justify-between'>

                <RadioGroup className='flex items-center gap-4 my-5'>
                    <div className="flex items-center space-x-2">
                         <Input
                         type="radio"
                         name="role"
                         value="student"
                         checked={input.role==='student'}
                         onChange={changeEventHandler}
                         className="cursor-pointer"
                         />
                         <Label htmlFor='r1'>student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Input
                         type="radio"
                         name="role"
                         value="donar"
                         checked={input.role==='donar'}
                         onChange={changeEventHandler}
                          className="cursor-pointer"
                         />
                          <Label htmlFor='r1'>donar</Label>
                    </div> 
                </RadioGroup>

                <div className='flex items-center gap-2'>
                    <Label>Profile</Label>
                    <Input
                    accept="image/*"
                    type="file" 
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                    />
                </div>
            </div>
            {loading ? (
        <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </Button>
         ) : (
            <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#695292]">
                Signup
            </Button>
        )}
            <span className='text-sm'>Already have an account?<Link to="/login" className='text-blue-600'>Login</Link></span>
         </form>
       </div>
    </div>
  )
}

export default Signup
