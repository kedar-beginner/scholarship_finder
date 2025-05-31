import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Scholarship from './Scholarship'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

//const scholarshipArray =[1,2,3,4,5,6,7,8];
 
function Scholarships() {
     const {allscholarships,searchQuery}=useSelector(store=>store.scholarship);
     const [filterscholarships,setFilterscholarships]=useState(allscholarships);
     useEffect(()=>{
            if(searchQuery){
                   const filteredscholarships= allscholarships.filter((scholarship)=>{
                    return scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           scholarship.description.toLowerCase().includes(searchQuery.toLowerCase())||
                           scholarship.location.toLowerCase().includes(searchQuery.toLowerCase())
                           
                   })
                   setFilterscholarships(filteredscholarships);
            }else{
               setFilterscholarships(allscholarships);
            }
     },[allscholarships,searchQuery])
  return ( 
    <div>
         <Navbar/>
         <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
                <div className='w-20%'> 
                     <FilterCard/>
                </div>
                    {
                        filterscholarships.length<=0? <span>scholarship Not Found</span>:(
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                        {
                                             filterscholarships.map((scholarship1,index)=>(
                                                <motion.div
                                                initial={{opacity:0,x:100}}
                                                animate={{opacity:1,x:0}}
                                                exit={{opacity:0,x:-100}}
                                                transition={{duration:0.3}}
                                                 key={scholarship1?._id}>
                                                        <Scholarship scholarship={scholarship1}/>
                                                </motion.div>
                                             ))
                                        } 
                                 </div>
                               
                            </div>
                        
                       )
                    }
            </div>
            
         </div> 
    </div>
  )
}

export default Scholarships
