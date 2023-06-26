import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ data }) => {
    return (
        <div className="w-1/4 h-[400px] flex flex-col items-center">
            <img
                src="https://cdn.shopify.com/s/files/1/1903/5289/products/Untitled-1_1_270x.jpg?v=1491406090"
                alt="mobile"
                className="w-full mb-5 object-cover"
            />
            <Link to="/" className="mb-[6px]">
                Xiaomi Mi Pad {data}
            </Link>
            <h2 className="mb-[10px] text-base text-main">$175.99 USD</h2>
        </div>
    )
}

export default Product
