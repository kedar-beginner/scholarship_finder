import { setallAppliedscholarships } from "@/redux/scholarshipSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedscholarship=()=>{
       const dispatch =useDispatch();

       useEffect(()=>{
           const fetchAppliedscholarships =async ()=>{
               try {
                   const res =await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                   if(res.data.success){
                        dispatch(setallAppliedscholarships(res.data.application));
                   }
               } catch (error) {
                   console.log(error);
               }
           }
           fetchAppliedscholarships();
       },[]); 
}
export default useGetAppliedscholarship;