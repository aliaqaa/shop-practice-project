import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router'

function DefaultLayout() {
  return (
    <>
        <Header/>
        <Outlet/>

        <Footer/>
    </>
  )
}

export default DefaultLayout