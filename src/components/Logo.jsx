import React from 'react'
import '../styles/logo.css'

function Logo() {
  return (
    <div className='flex justify-center items-center '>
      <img src='/assets/quill.png' alt="" className='h-[2rem] ' />
      <p className=' text-[1.7rem] tracking-wide cursive-text overflow-visible'>SoulScribe</p>
    </div>
  )
}

export default Logo