import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Registor from '../screens/Registor'


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registor" element={<Registor />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes