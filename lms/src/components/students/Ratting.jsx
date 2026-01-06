import React, { use, useEffect } from 'react'

const Ratting = ({initialRating,onRate}) => {
   const [rating,setRating]=React.useState(initialRating || 0);

   const handleRatting=(value)=>{
    setRating(value);
    if (onRate) onRate(value);
   }

   useEffect(()=>{
    if(initialRating){
   setRating(initialRating);
    }
    
   },[initialRating]);
  return (
   
    <>
    <div>
      {Array.from({length:5},(_,index)=>{
        const startValue=index+1;
        return (
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${startValue <=rating ? 'text-yellow-500' : 'text-gray-300'}`} onClick={()=>handleRatting(startValue)}>★</span>
        )
      })}
    </div>
    </>
  )
}

export default Ratting