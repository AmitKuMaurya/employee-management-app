import React from 'react'
import { Link } from 'react-router-dom'
import FilterEmployee from './FilterEmployee'

const AdderSection = () => {
  return (
    <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",height:"60px",width:"85%",margin:"auto"}}>
        <button><Link to={"/create/employee"}>Add Employee</Link></button>
        <FilterEmployee/>
    </div>
  )
}

export default AdderSection