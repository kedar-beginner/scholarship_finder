import { setAllscholarships } from '@/redux/scholarshipSlice';
import { scholarship_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetAllscholarships() {
    const dispatch =useDispatch();
    const {searchQuery}=useSelector(store=>store.scholarship);
  useEffect(()=>{
      const fetchAllscholarships =async()=>{
        try {
            const res= await axios.get(`${scholarship_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllscholarships(res.data.scholarships));
            }
        } catch (error) {
            console.log(error);
        }
      }
      fetchAllscholarships();
  },[])
}

export default useGetAllscholarships;
