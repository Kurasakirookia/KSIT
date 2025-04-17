import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import "../css/Layout.css"

const Layout = () => {
  return (
    <div className='layout_container'>
        <Navbar/>
        <div className="layout_content">
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Layout
