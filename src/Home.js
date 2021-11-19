import React from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Modal from "./Modal";
import { useGlobalContext } from "./context";

const Home = () => {
  const { state } = useGlobalContext();

  return (
    <div className="app">
      {state.modalOpen && <Modal />}
      <Navbar />
      <Products />
    </div>
  );
};

export default Home;
