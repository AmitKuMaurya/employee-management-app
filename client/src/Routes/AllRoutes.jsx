import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import EditEmployee from '../pages/EditEmployee';
import CreateProducts from '../pages/AddEmployee'
import HomeEmployee from '../pages/HomeEmployee'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<HomeEmployee/>} />
        <Route path={"/create/employee"} element={<CreateProducts/>} />
        {/* <Route path={"/update/employee/:id"} element={<EditEmployee/>} /> */}
      </Routes>
    </div>
  )
}

export default AllRoutes