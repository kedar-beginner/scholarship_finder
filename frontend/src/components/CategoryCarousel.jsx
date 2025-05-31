import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchQuery } from '@/redux/scholarshipSlice'

const category =[
    "ONGC SCHOLRSHIP",
    "FFE SCHOLRSHIP",
    "RELINACE SCHOLRSHIP",
    "HDFC SCHOLARSHIP",
    "NSP-SCHEME"
]
function CategoryCarousel() {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const searchscholarshipHandeler=(query)=>{
           dispatch(setsearchQuery(query));
          navigate("/browse");
    }
  return (
    <div>
           <Carousel className='w-full max-w-xl mx-auto my-20'>
              <CarouselContent>
                    {
                    category.map((cat,index)=>( 
                            <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                               <Button onClick={()=>searchscholarshipHandeler(cat)} variant="outline" className='rounded-full '>{cat}</Button>
                            </CarouselItem>
                    ))
                    }
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext/>
           </Carousel>
    </div>
  )
}

export default CategoryCarousel
