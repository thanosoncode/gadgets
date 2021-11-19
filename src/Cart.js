import React, { useRef, useState } from "react";

import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Cart = () => {
  const {
    state,
    clearCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    checkOut,
    checkOutStripe,
  } = useGlobalContext();
  const [sale, setSale] = useState(false);
  console.log(state.cart);
  const totalProducts = state.cart.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);

  const beforeSale = state.cart.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.price;
  }, 0);

  const afterSale = () => {
    let removedCost = beforeSale * 0.25;
    const afterSaleCost = beforeSale - removedCost;
    return afterSaleCost;
  };

  const inputEl = useRef();

  const checkSale = (e) => {
    e.preventDefault();
    if (inputEl.current.value.toLowerCase().trim() === "react") {
      setSale(true);
    }
  };

  return (
    <div className="cart-container">
      <h3>Your Cart</h3>
      {state.cart.length > 0 ? (
        <div className="cart-items-container">
          <table>
            <thead className="cart-head">
              <tr>
                <th>PRODUCT</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>REMOVE</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map((item, index) => {
                return (
                  <tr key={index} className="cart-item-row">
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-img"
                      />
                    </td>
                    <td className="td-name">{item.name}</td>
                    <td className="cart-item-price">${item.price}.00</td>
                    <td className="cart-item-quantity">
                      <button onClick={() => decreaseQuantity(item.id)}>
                        <FaMinus />
                      </button>
                      <div>{item.quantity}</div>
                      <button onClick={() => increaseQuantity(item.id)}>
                        <FaPlus />
                      </button>
                    </td>

                    <td className="cart-item-subtotal">
                      ${item.price * item.quantity}.00
                    </td>
                    <td
                      className="cart-item-trash"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTimes />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <aside>
            <div>
              <form onSubmit={checkSale}>
                <div className="promo-div">
                  <input
                    type="text"
                    placeholder="Enter promo code - react"
                    ref={inputEl}
                  />
                  <button type="submit">
                    <FaPlus />
                  </button>
                </div>
              </form>
            </div>

            <div className="summary">
              <h4>Order Summary</h4>
              <div className="summary-row">
                <span>Products</span>
                <span>{totalProducts}</span>
              </div>
              <div className="summary-row">
                <span>Sale</span>
                <span className={sale ? "sale" : ""}>
                  {sale ? "25%" : "0%"}
                </span>
              </div>
              <div className="summary-row">
                <span>Total</span>
                <span>${sale ? afterSale() : beforeSale}.00</span>
              </div>
              <button className="checkout" onClick={checkOutStripe}>
                CheckOut
              </button>
            </div>
          </aside>
        </div>
      ) : (
        <div className="is-empty">...is empty</div>
      )}
    </div>
  );
};

export default Cart;
