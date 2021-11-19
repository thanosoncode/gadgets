import React, { useContext, useReducer } from "react";
import data from "./data";
import reducer from "./reducer";
import { loadStripe } from "@stripe/stripe-js";

const AppContext = React.createContext();

const initialState = {
  products: data,
  mouseOver: false,
  modalOpen: false,
  detailsModal: false,
  modalId: null,
  cart: [],
  amount: 0,
  sale: false,
  total: 0,
  checkoutDone: false,
  modalFromTop: 0,
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = (id, addedFrom, buttonFromTop) => {
    dispatch({ type: "OPEN_MODAL", payload: [id, addedFrom, buttonFromTop] });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const checkOut = () => {
    dispatch({ type: "CHECKOUT" });
  };

  const stripeLoadedPromise = loadStripe(
    "pk_test_51JxUo3CZJOPoK6dyxzvrPsyhzZD16xsW05FARSVBvlidMlpTkqEuBIw7pap9ZfhBqDp4wYGVp6yLw0Ysn3Da0ib10084kYop9I"
  );

  const checkOutStripe = async () => {
    const stripe = await stripeLoadedPromise;

    try {
      const result = await stripe.redirectToCheckout({
        lineItems: state.cart.map((item) => {
          const { priceStripe, quantity } = item;
          const newItem = { price: priceStripe, quantity: quantity };
          return newItem;
        }),

        mode: "payment",
        successUrl: "https://react-gadgets.netlify.app",
        cancelUrl: "https://react-gadgets.netlify.app",
      });
      console.log(result.error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        checkOut,
        checkOutStripe,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useGlobalContext };
