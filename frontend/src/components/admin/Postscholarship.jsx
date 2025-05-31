import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux'; 
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import { scholarship_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
  
  
function Postscholarship() {
    const [input ,setInput]=useState({
        title:"",
        description:"",
        special_cat:"Open for all",
        amount:"", 
        location:"All over India",
        s_Type:"Full",
        grants:0,
        gpa:10,
        course:"All courses",
        deadline:"",
        apply_link:"",
        companyId:""
    });
    const navigate=useNavigate();
    const [loading,setloading]=useState(false);
    const {companies} =useSelector(store=>store.company)
    const changeEventHandeler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const selectChangeHandeler=(value)=>{
        const selectedCompany =companies.find((company)=>company.name.toLowerCase()===value);
        setInput({...input,companyId:selectedCompany._id});
    }
    const submitHandeler= async(e)=>{
         e.preventDefault(); 
         try {
            setloading(true); 
            const res = await axios.post(`${scholarship_API_END_POINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/scholarships");
            }

         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }finally{
            setloading(false);
         }
    }
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center w-screen my-5'>
               <form onSubmit={submitHandeler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md'>
                <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Special cat</Label>
                            <Input
                            type="text"
                            name="special_cat"
                            value={input.special_cat}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Amount</Label>
                            <Input
                            type="text"
                            name="amount"
                            value={input.amount}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Scholarship Type</Label>
                            <Input
                            type="text"
                            name="s_Type"
                            value={input.s_Type}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        
                        <div>
                            <Label>Grants</Label>
                            <Input
                            type="number"
                            name="grants"
                            value={input.grants}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Minimum GPA</Label>
                            <Input
                            type="number"
                            name="gpa"
                            value={input.gpa}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                         <div>
                            <Label> Open For Cources</Label>
                            <Input
                            type="text"
                            name="course"
                            value={input.course}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Deadline</Label>
                            <Input
                            type="date"
                            name="deadline"
                            value={input.deadline}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                         <div>
                            <Label>Apply link</Label>
                            <Input
                            type="text"
                            name="apply_link"
                            value={input.apply_link}
                            onChange={changeEventHandeler}
                            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            
                            companies.length>0 && (
                                <Select onValueChange={selectChangeHandeler}>
                                    <SelectTrigger className="w-50%">
                                        <SelectValue placeholder={'Select A Company'}/>  
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company)=>{
                                                    return(
                                                        <SelectItem value={company.name.toLowerCase()}>
                                                        {company?.name}
                                                    </SelectItem>
                                                )} )
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                </div>  
                {
                 loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button>:<Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#695292]">Post A new scholarship</Button>
                } 
                 {
                    companies?.length ===0 && <p className='text-xs text-red-600 font-bold my-3'> *Please register a Company first before posting a scholarship.</p>
                }
                </form>
        </div>
    </div>
  )
}

export default Postscholarship
