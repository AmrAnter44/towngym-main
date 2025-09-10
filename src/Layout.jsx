import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './comp/Home'
import Nav from './Nav'
import Nav2 from './Nav2'

import Footer from './Footer'

export default function Layout() {
  return <>
  
  <Nav></Nav>

  <Outlet className="mt-20"/>
<Footer></Footer>
  
  
  </>
}
