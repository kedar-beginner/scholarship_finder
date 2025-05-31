import React from 'react'
import LatestscholarshipCards from './LatestscholarshipCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 import { motion } from 'framer-motion';
function Latestscholarships() {
  const {allscholarships}=useSelector(store=>store.scholarship);
  const navigate =useNavigate();
  return (
    <div className='max-w-7xl mx-8 my-20'>
         <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>scholarships </h1>
         <div className='grid grid-cols-3 gap-4 my-5'>
            {
               allscholarships.length<=0?<span>NO SCHOLARSHIP AVAILABLE</span> :
               allscholarships?.slice(0,6).map((scholarship)=>(
               <motion.div 
              initial={{opacity:0,x:100}}
               animate={{opacity:1,x:0}}
               exit={{opacity:0,x:-100}}
               transition={{duration:0.3}}
               >

                   <LatestscholarshipCards key={scholarship._id} scholarship={scholarship}/>
               </motion.div>))
            }
         </div> 
    </div>
  )
}

export default Latestscholarships
