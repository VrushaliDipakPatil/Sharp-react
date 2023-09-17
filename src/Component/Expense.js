import React from 'react'
import { Link } from 'react-router-dom';
import './expense.css'

const Expense = () => {

  console.log('Expense')

  return (
    <>
    <div className="header">
    <div className="heading">Welcome to expense Tracker App!!!</div>
    <div className="incomplete">Your Profile is incomplete .<Link to="/updateprofile">Complete now</Link></div>
    </div>
    <hr/>
    </>
  )
}

export default Expense