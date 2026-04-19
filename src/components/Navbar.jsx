import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className='flex flex-wrap bg-indigo-700 text-white justify-between items-center p-4 flex-col md:flex-row'>
        <div className="Logo font-bold text-xl flex justify-center items-center p-2">Taskify</div>
        <ul className='flex gap-4 justify-center p-2 '>
          <li className='cursor-pointer hover:underline hover:font-bold  w-15  duration-75'><a href="/">Home</a></li>
          <li className='cursor-pointer hover:underline hover:font-bold  w-15  duration-75'><a href="/">todos</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
