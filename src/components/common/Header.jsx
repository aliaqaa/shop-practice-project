import React from 'react'
import { GiShop } from "react-icons/gi";

function Header() {
  return (
    <div className='flex justify-between bg-slate-400 p-5'>
<button className='bg-slate-600 p-2 rounded text-white'>Login</button>
      <GiShop className='text-5xl text-white bg-slate-600 p-1 rounded' />

    </div>
  )
}

export default Header