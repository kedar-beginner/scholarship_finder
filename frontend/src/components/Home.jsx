
import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel' 
import Latestscholarships from './Latestscholarships'
import Footer from './Footer'
import useGetAllscholarships from '@/hooks/useGetAllscholarships'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllscholarships();
  const {user} =useSelector(store=>store.auth);
  const navigate =useNavigate();
 useEffect(()=>{
        if(user?.role==='donar'){
          navigate("/admin/companies");            // react lifecycle methods
        }
  },[])

  return (
    <div>
      <Navbar/>
      <HeroSection/>
        <CategoryCarousel/>
        <Latestscholarships/>
        <Footer/> 
    </div>
  )
}

export default Home
