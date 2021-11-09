import React from 'react'
import {FaShoppingCart} from "react-icons/fa"
import {Link} from "react-router-dom"
import { useGlobalContext } from './context'
import {GiAtomicSlashes} from "react-icons/gi"

const Navbar = () => {
    const {state} = useGlobalContext()

    return (
        <nav className="navbar">
            <div className="nav-center">
                <Link to="/products">
                    <div className="logo-container">
                        <GiAtomicSlashes/>
                        <h3>Gadgets</h3>
                    </div>
                    
                </Link>
                <Link to="/cart">
                    <div className="nav-cart">
                        <div className="nav-cart-icon"><FaShoppingCart/>
                        <div className="amount">{state.amount}</div>
                        </div>
                        <span>Cart</span>
                    </div>
                </Link>
                
            </div>
        </nav>
    )
}

export default Navbar
