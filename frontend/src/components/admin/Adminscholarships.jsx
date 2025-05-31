import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminscholarshipsTable from './AdminscholarshipsTable'
import useGetAllAdminscholarships from '@/hooks/useGetAllAdminscholarships'
import { setsearchscholarshipByText } from '@/redux/scholarshipSlice'

const Adminscholarships= () =>{
    useGetAllAdminscholarships();
    const [input,setInput]=useState("");
    const navigate =useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
         dispatch(setsearchscholarshipByText(input));
    },[input]);
  return (
    <div>
         <Navbar/>
         <div className=' max-w-6xl mx-auto my-10'>
             <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="filter by Name,Course"
                    onChange={(e)=>setInput(e.target.value)}
                />
                <Button onClick={()=>navigate("/admin/scholarships/create")} className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out font-semibold"
>New Scholarship</Button>
             </div>
             <AdminscholarshipsTable/>
         </div>
    </div>
  )
}

export default Adminscholarships;
