import React from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeatureSection from '@/components/FeatureSection'
import Footer from '@/components/Footer'
import SmoothScroll from "@/components/SmoothScroll";

const page = () => {
  return (
    <div>
      <SmoothScroll/>
      <Navbar/>
      <HeroSection/>
      <FeatureSection/>
      <Footer/>
    </div>
  )
}

export default page
