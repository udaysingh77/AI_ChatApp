import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Registor from '../screens/Registor'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserAuth><Home/></UserAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes