
const reducer = (state,action) => {
    if(action.type === "OPEN_MODAL"){
        
        const selectedItem = state.products.find(item=>item.id ===action.payload[0])
        if(state.cart.every(item=>item.id !== selectedItem.id) === true){
            const newItem = {...selectedItem,quantity:1}

            if(action.payload[1] ==="productsPage") {
                return {...state,
                    modalOpen:true,
                    modalId:action.payload[0],
                    cart:[...state.cart,newItem],
                    amount: state.amount +1
                }
            }
            if(action.payload[1] === "detailsPage"){
                return {...state,
                    detailsModal:true,
                    modalId:action.payload[0],
                    modalOpen:false,
                    cart:[...state.cart,newItem],
                    amount: state.amount +1
                }
            }

           
        }else {
            return {...state,modalOpen:false,modalId:null}
        }
    }
    if(action.type === "CLOSE_MODAL"){
        
        return {...state,modalOpen:false,detailsModal:false,modalId:null}
    }
    if(action.type === "CLEAR_CART"){
        return {...state,cart:[],amount:0}
    }
    if(action.type === "REMOVE_ITEM") {
        return {...state, cart:state.cart.filter(item=>item.id !== action.payload),amount:state.amount -1}
    }
    if(action.type === "INCREASE") {
        console.log(state)
        return {...state,cart:state.cart.map(item=>item.id === action.payload ? {...item,quantity:item.quantity +1}: item),amount:state.amount + 1}
    }
    if(action.type ==="DECREASE") {
        const item = state.cart.find(item=>item.id === action.payload)
        console.log(item)
        if(item.quantity > 1) {
            return {...state,cart:state.cart.map(item=>item.id === action.payload ? {...item,quantity:item.quantity -1}: item),amount:state.amount - 1}
        }else {
            return {...state, cart:state.cart.filter(item=>item.id !== action.payload),amount:state.amount -1}
        }

    }

    return state
    
}

export default reducer
