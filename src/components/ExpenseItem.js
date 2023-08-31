import React from 'react';
import './expenseitem.css';

export default function ExpenseItem(props) {
    const expenses = [
        {
            id: 'e1',
            title: 'Toilet Paper',
            amount: 94.12,
            date: new Date(2020, 7, 14),
        },
        { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
        {
            id: 'e3',
            title: 'Car Insurance',
            amount: 294.67,
            date: new Date(2021, 2, 28),
        },
        {
            id: 'e4',
            title: 'New Desk (Wooden)',
            amount: 450,
            date: new Date(2021, 5, 12),
        },
    ];

    return (
        <>
            
                {expenses.map((data) => (
                    <div className='expense-item'>
                    <div key={data.id}>
                        <div>{data.date.toISOString()}</div>
                        <div className='expense-item__description'>
                            <h2>{data.title}</h2>
                            <p>{props.props}</p>
                            <div className='expense-item__price'>${data.amount}</div>
                        </div>
                    </div>
                    </div>
                ))}
            
        </>
    );
}
