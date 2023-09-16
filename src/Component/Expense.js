import React from 'react'
import { Link } from 'react-router-dom';
import './expense.css'

const Expense = () => {

    const handleCompleteProfile = () =>{
        window.location.href = '/updateprofile';
    }

  return (
    <>
    <div className="header">
    <div className="heading">Welcome to expense Tracker App!!!</div>
    <div className="incomplete">Your Profile is incomplete .<Link onClick={handleCompleteProfile}>Complete now</Link></div>
    </div>
    <hr/>
    </>
  )
}

export default Expense