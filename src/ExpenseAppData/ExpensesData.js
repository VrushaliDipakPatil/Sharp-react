import React, { useState } from "react";
import "./expensesedata.css";
import { useSelector } from "../../node_modules/react-redux/es/index";

const ExpensesData = (props) => {
  
  const expensedata = useSelector((state)=> state.expenses?.expensedata)
  const [editdata, setEditdata] = useState("");

  const deleteExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://movies-2a006-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
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
        `https://movies-2a006-default-rtdb.firebaseio.com/expenses/${editdata.id}.json`,
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
  

  return (
    <>
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
    </>
  );
};

export default ExpensesData;
