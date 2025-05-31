 
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestscholarshipCards({scholarship}) {
  const navigate =useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${scholarship._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>{scholarship?.company?.name}</h1>
            <p className='text-sm text-gray-500'>{scholarship?.location}</p>
        </div>
         <div>
            <h1 className='font-bold text-lg my-2'>{scholarship?.title}</h1>
            <p className='text-sm text-gray-600'>{scholarship?.description}</p>
         </div>
         <div className='flex items-center gap-2 mt-4'>
             <Badge className={'text-blue-700 font-bold'} variant ="ghost">{scholarship?.grants} Positions</Badge>
             <Badge className={'text-[#F83002] font-bold'} variant ="ghost">{scholarship?.s_Type}</Badge>
             <Badge className={'text-[#7209B7] font-bold'} variant ="ghost">{scholarship?.amount}LPA</Badge>
         </div>
    </div>
  )
}

export default LatestscholarshipCards
