import { setSinglescholarships } from '@/redux/scholarshipSlice';
import { scholarship_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useGetSinglescholarship(scholarshipId) {
    const dispatch =useDispatch();
    const {user}=useSelector(store=>store.auth);
    useEffect(()=>{
        const fetchSinglescholarships =async()=>{
          try {
              const res= await axios.get(`${scholarship_API_END_POINT}/get/${scholarshipId}`,{withCredentials:true});
              if(res.data.success){
                  dispatch(setSinglescholarships(res.data.scholarship));
              }
          } catch (error) {
              console.log(error);
          }
        }
        fetchSinglescholarships();
    },[scholarshipId,dispatch,user?._id])
}

export default useGetSinglescholarship;
