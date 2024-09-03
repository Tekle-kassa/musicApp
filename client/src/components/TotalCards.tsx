import React from 'react'
interface TotalCardsProps {
    children: React.ReactNode;
}


const TotalCards = ({children}:TotalCardsProps) => {
  return (
    <div className='bg-gradient-to-br from-red-950 w-60 to-yellow-700 bg-opacity-20 text-gray-200 flex flex-wra rounded-xl p-6'>
        {children}
    </div>
  )
}

export default TotalCards