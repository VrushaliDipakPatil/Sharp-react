import React, { useCallback, useEffect, useState } from "react";
import './addmedicine.css'
import BuyMedicine from "./BuyMedicine";
import Cart from "./Cart";

const AddMedicine = () => {

  const[medicine, setMedicine] = useState([])
  const[medicineCart, setMedicineCart]= useState([])

const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
})

const handleChange = (e) =>{
    const {name, value}= e.target;
    setForm({
        ...form,
        [name]:value
    })
}

useEffect(() => {
  fetchMedicineHandler()
  fetchMedicineCart()
},[])

async function handleOnSubmit(e) {
    e.preventDefault();
    try{
        const respone = await fetch('https://movies-2a006-default-rtdb.firebaseio.com/medicine.json',{
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          const data = respone.json();
    } catch(error){
        console.log(error);
    }
 
  }

  const  fetchMedicineHandler= useCallback(async() => {
    try {
      const response = await fetch("https://movies-2a006-default-rtdb.firebaseio.com/medicine.json");
      if (!response.ok) {
        throw new Error("Something went wrong.....Retrying!");       
      }
      const data = await response.json();
  
  const loadedMedicines = [];
   for(const key in data){
    loadedMedicines.push({
      id: key,
      name: data[key].name,
      desc: data[key].desc,
      price: data[key].price,
    })
   }
  
   setMedicine(loadedMedicines);
    } catch (error) {
      console.log(error);
    }
  },[])

  const  fetchMedicineCart= useCallback(async() => {
    try {
      const response = await fetch("https://movies-2a006-default-rtdb.firebaseio.com/medicinecart.json");
      if (!response.ok) {
        throw new Error("Something went wrong.....Retrying!");       
      }
      const data = await response.json();
  
  const loadedMedicines = [];
   for(const key in data){
    loadedMedicines.push({
      id: key,
      name: data[key].name,
      desc: data[key].desc,
      price: data[key].price,
    })
   }
  
   setMedicineCart(loadedMedicines);
    } catch (error) {
      console.log(error);
    }
  },[])

  const [showCart, setShowCart] = useState(false);
 
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="labels">
          <label>Medicine Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange}/>
        </div>
        <div className="labels">
          <label>Description</label>
          <input type="text" name="desc" value={form.desc} onChange={handleChange}/>
        </div>
        <div className="labels">
          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange}/>
        </div>
        <div className="labels">
          <button className="button">Add Medicine</button>
        </div>
        <div className="labels">
          <button className="button" onClick={toggleCart}>Cart</button>
        </div>
      </form>


      <BuyMedicine medicine={medicine} />
      <Cart showCart={showCart} handleClose={handleCloseCart} cartData={medicineCart}/>
    </>
  );
};

export default AddMedicine;
