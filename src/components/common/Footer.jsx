import React from 'react'
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa'
import { TfiEmail } from 'react-icons/tfi'

function Footer() {
  return (
    <div className='bg-slate-400'>
    <h1>code by ali tousi</h1>
    <div className="flex items-center justify-center text-4xl primaryOrange text-black p-1 rounded gap-x-5 ">
    <a href="https://t.me/mrAli2c">
      <FaTelegram />
    </a>
    <a
      href="https://linkedin.com/in/Ali-Tousi77"
    >
      <FaLinkedin />
    </a>
    <a href="mailto:ali.tousi77@gmail.com">
      <TfiEmail />
    </a>
    <a href="https://github.com/aliaqaa">
      <FaGithub />
    </a>
  </div>
      </div>
  )
}

export default Footer