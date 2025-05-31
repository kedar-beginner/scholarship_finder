import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import mongoose from "mongoose";
function CompanySetup() {
  
  const [input,setInput] =useState({
    name:"",
    description:"",
    website:"",
    location:"",
    file:null
  });
  const navigate=useNavigate();
  const [loading,setLoading] =useState(false);
  const {company }=useSelector((store)=>store.company);
  
  const params =useParams(); 
  useGetCompanyById(params.id); 

  const changeEventHandeler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value});   // asperate operator
  }
  const changeFileHandeler=(e)=>{
    const file =e.target.files?.[0]
    setInput({...input,file})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
        formData.append("file", input.file);
    }  

    try {
        setLoading(true);
        console.log(params);
        const res = await axios.put(
            `${COMPANY_API_END_POINT}/update/${params.id}`, // Ensure `params` is defined
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }
        );

        if (res?.data?.success) {
            toast.success(res.data.message);
            navigate("/admin/companies"); // Corrected navigation path
        }

    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "An error occurred while updating the company.");
    } finally {
        setLoading(false);
    }
};
   useEffect(()=>{
         setInput({
          name:company?.name ||"",
          description:company ?.description ||"",
          website:company ?.website ||"",
          location:company ?.location ||"",
          file:company?.file||null
         })
     } ,[company ]
   ) 

  return (
    <div>
        <Navbar/>
        <div className='max-w-xl mx-auto my-10'>
               <form onSubmit={submitHandler}>
                <div className='flex items-center gap-5 p-8'>
                      <Button onClick={(e)=>{navigate("/admin/companies")}} variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft/>
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                </div> 
                <div className='grid grid-cols-2 gap-4'>
                   <div>
                         <Label>Company Name</Label>
                            <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandeler}
                            />
                   </div> 
                    
                   <div>
                         <Label>Logo</Label>
                            <Input
                            type="file"
                            accept="image/*"  
                            onChange={changeFileHandeler}
                            />
                   </div> 
                </div> 
                  
                {
                 loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button>:<Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#695292]">Update</Button>
               } 
               </form>
        </div>
    </div>
  )
}

export default CompanySetup
