import React, { useState } from "react";
import "./orders.css";

const Orders = ({ orders, updateOrdersInLocalStorage }) => {
  const [orderdata, setOrderdata] = useState(orders)
  const tableNumbers = ["Table 1", "Table 2", "Table 3"];

  const handleDeleteOrder = (selectedTable, uniqueOrderId) => {
    const updatedOrdersWithoutDeleted = orders.filter(
      (order) =>
        !(order.selectedTable === selectedTable && order.uniqueOrderId === uniqueOrderId)
    );

    // Update local storage with the filtered orders
    localStorage.setItem("orders", JSON.stringify(updatedOrdersWithoutDeleted));

    updateOrdersInLocalStorage(updatedOrdersWithoutDeleted);

  };

  return (
    <>
      <h4>Orders:</h4>
      {tableNumbers.map((table) => (
        <div key={table}>
          <h3>{table}</h3>
          {orders
            .filter((order) => order.selectedTable === table)
            .map((order, index) => (
              <div key={index}>
                <ul>
                  <li>
                    {order.dish} - Rs. {order.price} - {order.selectedTable}{" "}
                    <button
                      onClick={() =>
                        handleDeleteOrder(order.selectedTable, order.uniqueOrderId)
                      }
                    >
                      Delete Order
                    </button>
                  </li>{" "}
                </ul>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default Orders;
