import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

function CompanyCreate() {
    const navigate=useNavigate();
    const [companyName ,setCompanyName]= useState();
    const dispatch =useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post( `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials:true
                }, 
            );
    
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id; 
                navigate(`/admin/comapanies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };
    
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'> 
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company/foundation Name</h1>
                <p className='text-gray-500'>What would you like to give your comapny name ? you can change it later.</p>  
            </div>
            <Label>
                 Comapany/foundation Name
             </Label>
             <Input
                type="text"
                className='my-2'
                placeholder="ONGC/FFE/ etc."
                onChange={(e)=>setCompanyName(e.target.value)}
             /> 
             <div className='flex items-center gap-2 my-10'>
                  <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
                  <Button className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out font-semibold"
 onClick={registerNewCompany}>Continue</Button>
             </div>
        </div>
    </div>
  )
}

export default CompanyCreate
