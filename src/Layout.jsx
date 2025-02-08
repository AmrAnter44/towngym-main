import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'

export default function Layout() {
  return <>
  
  <Nav/>
  <Outlet/>
  
  
  </>
}
