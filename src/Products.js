import React from 'react'
import { useGlobalContext } from './context'
import Product from './Product'


const Products = () => {
    const {state} = useGlobalContext()
    const {products} = state

    return (
        <section>
            <h2>Our Products</h2>
            <div className="products">
                
            {products.map(item=>{
                return <Product key={item.id} item={item}/>
            })}
            </div>
        </section>
    )
}

export default Products
