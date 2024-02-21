import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import settinglogo1 from "../Image/settinglogo1.png"

export default function Navbar() {
  return (
    <>
 <div className="container-fluid">
 <nav className="navbar navbar-expand-lg bg-body-tertiary nb">
  <div className="container-fluid d-flex justify-between">

    <div className='flex'>
    <img src={settinglogo1} alt="" className='logodesign' />

    <a className="navbar-brand navdesign" href="#">   Advance Driver Update</a>

    </div>
    <div className='mr-5'>
      <GridViewIcon fontSize="medium" className="nav-icon" />
      <BusinessCenterIcon fontSize="medium" className="nav-icon" />
    </div>

    
  </div>
</nav>
 </div>
      
    </>
  )
}
 