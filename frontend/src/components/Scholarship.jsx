import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Scholarship({scholarship}) {
    const navigate =useNavigate();
    //const scholarshipId="ebhfabUEFHuQBEHFBEHFB";
    const daysAgoFunction =(mongodbTime)=>{
         const createdAt =new Date(mongodbTime);
         const currentTime =new Date();
         const timeDifference =currentTime - createdAt;
         return Math.floor(timeDifference/(1000*24*60*60));
    }
     const daysRemainFunction =(mongodbTime)=>{
         const dueAt =new Date(mongodbTime);
         dueAt.setDate(dueAt.getDate());
         const currentTime =new Date();
         currentTime.setDate(currentTime.getDate());
         const timeDifference =dueAt-currentTime;
         return Math.floor(timeDifference/(1000*24*60*60));
    }
  return (
    <div className= {`p-5 rounded-md shadow-xl border border-gray-200 ${
            daysRemainFunction(scholarship?.deadline) < 0 ? 'bg-gray-300' : daysRemainFunction(scholarship?.deadline) === 0 ? 'bg-red-200':'bg-green-200'
    }`}>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start my-0.5'>
                 
                  <p className="text-sm font-bold">
                        {daysRemainFunction(scholarship?.deadline) === 0 ? (
                            <span className=' text-yellow-500'>Deadline today</span>
                        ) : daysRemainFunction(scholarship?.deadline) < 0 ? (
                            <span className=' text-sky-400'>Deadline passed</span>
                        ) : (
                            <span className=' text-yellow-500'>{daysRemainFunction(scholarship?.deadline)} days left</span>
                        )}
                 </p>
            </div> 
            <Button variant="outline" className="rounded-full" size="icon"><Bookmark></Bookmark></Button>
        </div>
     
      <div className='flex items-center gap-2 my-2'>
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src={scholarship?.company?.logo ? scholarship?.company?.logo:"data:image/png;base64,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" }></AvatarImage>
                </Avatar>
            </Button>
            <div>
                <h1  className='font-medium text-lg'>{scholarship?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{scholarship?.location}</p>
            </div>
      </div>
       <div>
         {/* <h1 className='font-bold text-lg my-2'>{scholarship?.title}</h1>*/}
           <p className='text-sm text-gray-600'>{scholarship?.description}</p>
       </div>
       <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant ="ghost">{scholarship?.grants} Grants</Badge>
                     <Badge className={'text-[#F83002] font-bold'} variant ="ghost">{scholarship?.s_Type}</Badge>
                     <Badge className={'text-[#7209B7] font-bold'} variant ="ghost">{scholarship?.amount} INR</Badge>
        </div>
     <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg shadow-sm">
            <h1 className="font-medium text-gray-700 text-xs">🎓 Minimum GPA:</h1>
            <span className="text-red-600 font-semibold text-sm">{scholarship?.gpa}</span>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg shadow-sm">
            <h1 className="font-medium text-gray-700 text-xs">📚 eligibility:</h1>
            <span className="text-red-600 font-semibold text-sm">{scholarship?.eligibility}</span>
        </div>
    </div>


        <div className='flex item center gap-4 mt-4'>
            <Button onClick={()=> navigate(`/description/${scholarship?._id}`)} variant="outline" className="bg-zinc-700 hover:bg-zinc-800 text-white">details</Button>
            <Button className="bg-[#6A38C2]">Save for later</Button>
        </div>
    </div>
  )
}

export default Scholarship
