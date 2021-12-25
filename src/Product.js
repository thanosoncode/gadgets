import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Product = ({ item }) => {
  const { openModal, state } = useGlobalContext();
  const { id, name, image, price } = item;
  const [cartPlus, setCartPlus] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const checkItem = (id) => {
    const selectedItem = state.products.find((item) => item.id === id);
    const every = state.cart.every((item) => item.id !== selectedItem.id);
    const inCart = !every;
    setAlreadyInCart(inCart);
  };
  const addedFrom = "productsPage";
  return (
    <div className="product">
      <div
        className="product-img"
        onMouseOver={() => {
          checkItem(id);
          setCartPlus(true);
        }}
        onMouseLeave={() => setCartPlus(false)}
      >
        <Link to={`/products/${id}`} className="product-link">
          <img src={image} alt={name} />
        </Link>
        <button
          className={cartPlus ? "cart-add-btn show" : "cart-add-btn"}
          onClick={() => openModal(id, addedFrom)}
        >
          {alreadyInCart ? "already in cart" : <FaCartPlus />}
        </button>
      </div>
      <Link to={`/products/${id}`} className="product-link">
        <h5>{name}</h5>
      </Link>
      <p>${price}.00</p>
    </div>
  );
};

export default Product;
