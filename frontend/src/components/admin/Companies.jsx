import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies= () =>{
    useGetAllCompanies();
    const [input,setInput]=useState("");
    const navigate =useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
         dispatch(setSearchCompanyByText(input));
    },[input]);
  return (
    <div>
         <Navbar/>
         <div className=' max-w-6xl mx-auto my-10'>
             <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="filter by name"
                    onChange={(e)=>setInput(e.target.value)}
                />
                <Button onClick={()=>navigate("/admin/comapanies/create")} className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out font-semibold"
>New Company/foundation</Button>
             </div>
             <CompaniesTable/>
         </div>
    </div>
  )
}

export default Companies;
