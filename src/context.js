import React, {useContext,useReducer} from 'react'
import data from "./data"
import  reducer  from './reducer'

const AppContext = React.createContext()

const initialState = {
    products:data,
    mouseOver:false,
    modalOpen:false,
    detailsModal:false,
    modalId:null,
    cart:[],
    amount:0,
    sale:false,
    total:0
}

const AppContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,initialState)
    
    const openModal = (id,addedFrom) => {
        dispatch({type:"OPEN_MODAL",payload:[id,addedFrom]})
    }
   
    const closeModal = () => {
        dispatch({type:"CLOSE_MODAL"})
    }

    const clearCart = () => {
        dispatch({type:"CLEAR_CART"})
    }

    const removeItem = (id) => {
        dispatch({type:"REMOVE_ITEM",payload:id})
    }

    const increaseQuantity = (id) => {
        dispatch({type:"INCREASE",payload:id})
    }

    const decreaseQuantity = (id) => {
        dispatch({type:"DECREASE",payload:id})
    }

    return (
        <AppContext.Provider value={{openModal,closeModal,removeItem,clearCart,increaseQuantity,decreaseQuantity,state}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContextProvider,useGlobalContext}
