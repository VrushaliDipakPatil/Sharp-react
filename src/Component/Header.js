import React from 'react'
import './header.css'
import { useNavigate } from '../../node_modules/react-router-dom/dist/index'

const Header = () => {

    const navigate = useNavigate()

const handleLogout=()=>{
    localStorage.removeItem('sharp-token')
    navigate('/')
}

  return (
    <>
    <div className="main-header">
      <div className="main-heading">Expense Tracker</div>
      <div className="heading">
   <button className='logout-button' onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  </>
  )
}

export default Header