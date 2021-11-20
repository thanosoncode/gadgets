import React from "react";
import data from "./data";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const Modal = () => {
  const { state, closeModal } = useGlobalContext();

  const id = state.modalId - 1;

  return (
    <>
      <div className="modal-container">
        <div className="modal" style={{ top: `${state.modalFromTop}px` }}>
          <div className="close-modal" onClick={closeModal}>
            <FaTimes />
          </div>
          <h3>Item Successfully Added To Cart</h3>
          <div className="modal-item">
            <img src={data[id].image} alt="" />
            <div className="modal-info">
              <div className="modal-item-title">
                <h5>{data[id].name}</h5>
                <h5>${data[id].price}.00</h5>
              </div>
              <div className="modal-buttons">
                <Link to="/cart">
                  <button className="modal-btn black" onClick={closeModal}>
                    View Cart
                  </button>
                </Link>
                <Link to="/products">
                  <button className="modal-btn green" onClick={closeModal}>
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
