import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Scholarship from './Scholarship'
import { useDispatch, useSelector } from 'react-redux'
import { setsearchQuery } from '@/redux/scholarshipSlice';
import useGetAllscholarships from '@/hooks/useGetAllscholarships';
import { motion } from 'framer-motion';
//const randomscholarships=[1,2,3,5,6,7,8]
function Browse() {
  useGetAllscholarships();
  const {allscholarships}=useSelector(store=>store.scholarship);
  const dispatch =useDispatch();
  useEffect(()=>{
       return()=>{
        dispatch(setsearchQuery(""));
       }
  })
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
           <h1 className='font-bold text-xl my-10'>Search Results ({allscholarships.length})</h1>
           
           <div className='grid grid-cols-3 gap-4'>{
                allscholarships.map((scholarship1)=>{
                        return (
                          <motion.div
                              initial={{opacity:0,x:100}}
                              animate={{opacity:1,x:0}}
                              exit={{opacity:0,x:-100}}
                              transition={{duration:0.3}}
                          >
                            <Scholarship key={scholarship1._id} scholarship={scholarship1}/>
                          </motion.div>
                            
                        )
                })
            }
          </div>
      </div>
    </div>
  )
}

export default Browse
