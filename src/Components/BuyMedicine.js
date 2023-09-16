import React from "react";
import "./buymedicine.css";

const BuyMedicine = (props) => {
    async function handleAddCart(medicine) {
        try{
            const respone = await fetch('https://movies-2a006-default-rtdb.firebaseio.com/medicinecart.json',{
                method: 'POST',
                body: JSON.stringify(medicine),
                headers: {
                  'Content-Type' : 'application/json'
                }
              })
              const data = respone.json();
        } catch(error){
            console.log(error);
        }
     
      }
  return (
    <>
      {props.medicine.map((data) => 
       ( <div className="description">
          <div className="label">{data.name}</div>
          <div className="label">{data.desc}</div>
          <div className="label">₹{data.price} </div>
          <div className="label">1</div>
          <button className="button" onClick={()=>handleAddCart(data)}>Add to Cart</button>
        </div>
        )
      )}
    </>
  );
};

export default BuyMedicine;
