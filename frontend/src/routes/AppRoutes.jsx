import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Registor from '../screens/Registor'
import Project from '../screens/Project'


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/project" element={<Project />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes