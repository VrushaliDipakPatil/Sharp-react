import React from 'react'
import CartContext from './cart-context'

const CartProvider = (props) => {

    const addItemtoCartHandler = (item) => {}

    const removeItemfromCartHandler = (item) => {}

const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemtoCartHandler,
    removeItem: removeItemfromCartHandler
}

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider