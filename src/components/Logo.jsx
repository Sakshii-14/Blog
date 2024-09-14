import React from 'react'
import logoimg from './quill.png'
import '../styles/logo.css'

function Logo() {
  return (
    <div className='flex justify-center items-center '>
      <img src={logoimg} alt="" className='h-[2rem] ' />
      <p className=' text-[1.7rem] tracking-wide cursive-text overflow-visible'>SoulScribe</p>
    </div>
  )
}

export default Logo