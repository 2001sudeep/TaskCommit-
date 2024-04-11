import React from 'react'

export const Navbar = () => {
  return (
   <nav>
    <ul className='flex justify-between bg-gradient-to-r from-purple-400 via-purple-200 to-purple-400 text-white py-2'>
      <div className="logo">
        <span className='font-bold md:text-xl mx-12 grid text-black '>Task-Commit</span>
      </div>
      <ul className="flex gap-8 mx-9 text-black">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Commits</li>
      </ul>
    </ul>
   </nav>
  )
}
