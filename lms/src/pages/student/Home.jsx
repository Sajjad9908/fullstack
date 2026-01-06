import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import Testimonials from '../../components/students/Testimonials'
import CallToAction from '../../components/students/CallToAction'
import Footer from '../../components/students/Footer'

const Home = () => {
  return (
    <div className='flex items-center flex-col space-y-7 text-center'>
    <Hero/>
    <Companies/>
    <CoursesSection/>
    <Testimonials/>
    <CallToAction/>
    <Footer/>
    </div>
  )
}

export default Home