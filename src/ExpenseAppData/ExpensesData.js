import React, {  useReducer, useState } from "react";
import "./expensesedata.css";
import { useSelector } from "react-redux";


const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { isDarkTheme: !state.isDarkTheme };
    case 'ACTIVATE_PREMIUM':
      return { isDarkTheme: true };
    default:
      return state;
  }
};

const ExpensesData = (props) => {

  const expensedata = useSelector((state) => state.expenses?.expensedata);
  const ispremium = useSelector((state) => state.expenses?.isactivatePremium)
  const [editdata, setEditdata] = useState("");
  const email = useSelector((state)=> state.auth?.user_email)


  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://movies-2a006-default-rtdb.firebaseio.com/${email}/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      props.fetchExpenseHandler();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditdata(expense);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditdata({
      ...editdata,
      [name]: value,
    });
  };

  const updateExpenseHandler = async () => {
    try {
      const response = await fetch(
        `https://movies-2a006-default-rtdb.firebaseio.com/${email}/${editdata.id}.json`,
        {
          method: "PUT", // Use PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expense: editdata.expense,
            amount: editdata.amount,
            category: editdata.category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update expense.");
      }

      props.fetchExpenseHandler();
      setEditdata(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const [state, themedispatch] = useReducer(themeReducer, { isDarkTheme: false });

  const activatePremium = () => {
    themedispatch({ type: 'ACTIVATE_PREMIUM' });
  };
  
  const toggleTheme = () => {
    themedispatch({ type: 'TOGGLE_THEME' });
  };

  const handleDownloadFile = () => {
    // Convert your expensedata to CSV format
    const csvContent = "data:text/csv;charset=utf-8,"
      + expensedata.map((expense) => Object.values(expense).join(",")).join("\n");

    // Create a blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'expenses.csv'; // Set the desired file name

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger a click event to initiate download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };
  return (
    <div className={state.isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <div className="expense-item">
        <div className="expense-heading">
          <div>Expense</div>
          <div>Amount</div>
          <div>Category</div>
        </div>
        {expensedata.map((expense, index) => (
          <>
            <div className="expense-info" key={index}>
              {editdata?.id === expense.id ? (
                <div>
                  <input
                    type="text"
                    name="expense"
                    value={editdata.expense}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div>{expense.expense}</div>
              )}

              {editdata?.id === expense.id ? (
                <div>
                  <input
                    type="text"
                    name="amount"
                    value={editdata.amount}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div>{expense.amount}</div>
              )}
              {editdata?.id === expense.id ? (
                <div>
                  <input
                    type="text"
                    name="category"
                    value={editdata.category}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div>{expense.category}</div>
              )}

              {editdata?.id === expense.id ? (
                <button onClick={updateExpenseHandler}>Save</button>
              ) : (
                <button
                  onClick={() => {
                    handleEdit(expense);
                  }}
                >
                  Edit
                </button>
              )}

              <button onClick={() => deleteExpenseHandler(expense.id)}>
                Delete
              </button>
            </div>
          </>
        ))}
      </div>

     {ispremium && ( <div className="premium"> 
        <p>Your expenses are more than ₹10000</p>
        <button className="premium-button" onClick={activatePremium}>Activate Premium</button>
        <button className="premium-button" onClick={toggleTheme}>Toggle Theme</button>
        <button className="premium-button" onClick={handleDownloadFile}>Download file</button>
      </div>)}
    </div>
  );
};

export default ExpensesData;
