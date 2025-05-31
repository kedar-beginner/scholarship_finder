import { setallAdminscholarships } from '@/redux/scholarshipSlice';
import { scholarship_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllAdminscholarships() {
    const dispatch =useDispatch();
  useEffect(()=>{
      const fetchAllAdminscholarships =async()=>{
        try {
            const res= await axios.get(`${scholarship_API_END_POINT}/getadminscholarships`,{withCredentials:true});
            if(res.data.success){
                dispatch(setallAdminscholarships(res.data.scholarships));
            }
        } catch (error) {
            console.log(error);
        }
      }
      fetchAllAdminscholarships();
  },[])
}

export default useGetAllAdminscholarships;
