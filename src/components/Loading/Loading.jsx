import React from 'react'
import { GiShop } from 'react-icons/gi'

function Loading() {
  return (
    <div className='m-auto justify-center my-10 flex gap-x-20'>
                <GiShop className="text-5xl text-white bg-slate-600 p-1 rounded  animate-ping" />
                <GiShop className="text-5xl text-white bg-slate-600 p-1 rounded  animate-ping" />
                <GiShop className="text-5xl text-white bg-slate-600 p-1 rounded  animate-ping" />
        
    </div>
  )
}

export default Loading