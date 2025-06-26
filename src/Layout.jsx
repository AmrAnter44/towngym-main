import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './comp/Home'
import Nav from './Nav'
import Footer from './Footer'
Footer
export default function Layout() {
  return <>
  
<Nav></Nav>
  <Outlet/>
<Footer></Footer>
  
  
  </>
}
