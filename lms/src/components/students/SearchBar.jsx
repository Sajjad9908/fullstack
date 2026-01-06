import React, { useEffect } from 'react'
import { assets } from '../../assets/assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate=useNavigate();
  const [input,setInput]=React.useState(data?data:'');

  useEffect(() => {
    setInput(data ? data : '');
  }, [data]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('searching for ',input);
    navigate('/course-list/' + input);
  }
  return (
   
      <form onSubmit={handleSubmit} className='max-w-xl w-full md:h-14 h-12 flex item-center bg-white border border-gray-300 rounded'>
        <img src={assets.search_icon } alt="search icon" className='w-8 md:w-12 px-3'/>
        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80 border-none'/>
        <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 m-1'>Search</button>
      </form>
   
  )
}

export default SearchBar