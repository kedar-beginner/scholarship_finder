import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import useGetSinglescholarship from '@/hooks/useGetSinglescholarship';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT, scholarship_API_END_POINT } from '@/utils/constant';
import { setSinglescholarships } from '@/redux/scholarshipSlice';
import { toast } from 'sonner';

function ScholarshipDescription() { 
  const params =useParams();
  const scholarshipId =params.id;
  //useGetSinglescholarship(scholarshipId);
  const {singlescholarship}=useSelector(store=>store.scholarship);  
  const {user}=useSelector(store=>store.auth);

  const isInitiallyApplid = singlescholarship?.applications.length>0 ? singlescholarship?.applications?.some(application => application?.applicant === user?._id):false; // some returns if in the array the given condition is statisfy for some item
  const [isApplid,setIsApplied] =useState(isInitiallyApplid); 
  const dispatch =useDispatch();

  const applyscholarshipHandeler =async ()=>{
    try {
        window.open(`${singlescholarship?.apply_link}`, '_blank');
        const res =await axios.get(`${APPLICATION_API_END_POINT}/apply/${scholarshipId}`,{withCredentials:true});
        if(res.data.success){
             setIsApplied(true); //update the local state
             const updatedApplications = [...(singlescholarship?.applications || []), { applicant: user?._id }];
             const updatedSinglescholarship = { ...singlescholarship, applications: updatedApplications }; //this is destructuring that is us for updating the data at real time
             dispatch(setSinglescholarships(updatedSinglescholarship)); // help us to real time ui update 
             toast.success(res.data.message);
        }
    }catch (error) {
       console.log(error);
       toast.error(error.response.data.message);
    }
  }
    
  useEffect(()=>{
    const fetchSinglescholarships =async()=>{
      try {
          const res= await axios.get(`${scholarship_API_END_POINT}/get/${scholarshipId}`,{withCredentials:true});
          if(res.data.success){
              dispatch(setSinglescholarships(res.data.scholarship));
              let temp=res.data.scholarship.applications.length>0 ? res.data.scholarship.applications.some(application=>application.applicant=== user?._id):false;
              setIsApplied(temp); // ensure the state is sync with the current data
          }
      } catch (error) {
          console.log(error);
      }
    }
    fetchSinglescholarships();
},[scholarshipId,dispatch,user?._id])

 const daysRemainFunction =(mongodbTime)=>{
         const dueAt =new Date(mongodbTime);
         dueAt.setDate(dueAt.getDate());
         const currentTime =new Date();
         const timeDifference =dueAt-currentTime;
         return Math.floor(timeDifference/(1000*24*60*60));
  }

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
          <div>
            <h1 className='font-bold text-xl'>{singlescholarship?.title}</h1>
              <div className='flex items-center gap-2 mt-4'>
                                  <Badge className={'text-blue-700 font-bold'} variant ="ghost">{singlescholarship?.grants} Grants</Badge>
                                    <Badge className={'text-[#F83002] font-bold'} variant ="ghost">{singlescholarship?.s_Type}</Badge>
                                    <Badge className={'text-[#7209B7] font-bold'} variant ="ghost">{singlescholarship?.amount} INR</Badge>
              </div>
          </div> 
          
            <Button 
                onClick={isApplid ?null:daysRemainFunction(singlescholarship?.deadline)<0?null:applyscholarshipHandeler}
                disabled={isApplid}  
                className={`rounded-lg text-white ${isApplid  ? 'bg-gray-600 cursor-not-allowed' :daysRemainFunction(singlescholarship?.deadline)<0? 'bg-gray-600 cursor-not-allowed':'bg-[#7209B7] hover:bg-[#5f32ad]'}`}>
                {isApplid ? 'Already Applied' :daysRemainFunction(singlescholarship?.deadline)<0?'deadline passed':'Apply'}
            </Button>
      </div> 
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singlescholarship?.description}</h1>
        <div className='my-4'>
             <h1 className='font-bold my-1'> Scholarship name: <span className='font-normal text-gray-800'>{singlescholarship?.title}</span></h1>
             <h1 className='font-bold my-1'> Available for Location: <span className='font-normal text-gray-800'>{singlescholarship?.location}</span></h1>
             <h1 className='font-bold my-1'> Description: <span className='font-normal text-gray-800'> {singlescholarship?.description}</span></h1>
             <h1 className='font-bold my-1'> Available for cources: <span className='font-normal text-gray-800'>{singlescholarship?.course}</span></h1>
             <h1 className='font-bold my-1'> Minimum gpa required : <span className='font-normal text-red-800'>{singlescholarship?.gpa}/4</span></h1>
             <h1 className='font-bold my-1'> AMOUNT: <span className='font-normal text-gray-800'>{singlescholarship?.amount} INR</span></h1>
             <h1 className='font-bold my-1'> Total Application: <span className='font-normal text-gray-800'>{singlescholarship?.applications?.length}</span></h1>
             <h1 className='font-bold my-1'> eligibility: <span className='font-normal text-gray-800'> {singlescholarship?.eligibility} </span></h1>
             <h1 className='font-bold my-1'> Deadline: <span className='font-normal text-red-800'>{singlescholarship?.deadline.split("T")[0]}</span></h1>
             <h1 className='font-bold my-1'> Apply link:   <a href={singlescholarship?.apply_link} target="_blank" rel="noopener noreferrer"className="font-normal text-blue-800 hover:underline hover:text-blue-600"> {singlescholarship?.apply_link} </a></h1>
        </div>
    </div>
  )
}

export default ScholarshipDescription
