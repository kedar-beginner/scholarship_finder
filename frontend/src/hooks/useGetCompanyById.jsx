import { setSingleCompany } from '@/redux/companySlice';
import { setAllscholarships } from '@/redux/scholarshipSlice';
import { COMPANY_API_END_POINT, scholarship_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetCompanyById(companyId) {
    const dispatch =useDispatch();
    const existingCompany = useSelector(store => store.company);
  useEffect(()=>{
      const fetchSingleCompany =async()=>{
        try {
            const res= await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
            if(res.data.success){
                if (!existingCompany || existingCompany._id !== res.data.company._id) {
                    dispatch(setSingleCompany(res.data.company));
                }
            }
        } catch (error) {
            console.log(error);
        }
      }
      fetchSingleCompany();
  },[])
}

export default useGetCompanyById;
