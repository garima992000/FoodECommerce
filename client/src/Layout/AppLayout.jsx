import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
      <Navbar/>
      <main className="app-main">
        <Outlet/>
      </main>
    </>
  )
}

export default AppLayout
