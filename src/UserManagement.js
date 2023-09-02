import React, { useState } from "react";
import "./UserManagement.css"; 
import './Modal.css'

function UserManagement() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [negativeAgeError, setNegativeAgeError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addUser = () => {
    if (!name.trim() || age <= 0) {
      if (!name.trim()) {setEmptyFieldsError(true); openModal()};
      if (age <= 0) {setNegativeAgeError(true); openModal()};
      return;
    }

    const newUser = { name, age: parseInt(age) };
    setUsers([newUser, ...users]);
    setName("");
    setAge("");
  };

  return (
    <>
    <div className="user-management">
      <h1>User Management</h1>
      <div className="form">
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="field">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <br />
        <button onClick={addUser}>Add User</button>
      </div>

      <div className="user-list">
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              Name: {user.name}, Age: {user.age}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
{emptyFieldsError? <p>Please add user Name and Age</p> :negativeAgeError? <p>Age must be >=0</p>: ''}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
</>
  );
}

export default UserManagement;
