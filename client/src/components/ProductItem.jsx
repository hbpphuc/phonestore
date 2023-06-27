import React from 'react'
import { Link } from 'react-router-dom'
import { productAction } from '../utils/menu'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const ProductItem = ({ data }) => {
    return (
        <div className="w-1/4 h-[400px] flex flex-col items-center product-item border">
            <Link to="/" className="w-full h-[305px] mb-5 p-[15px] overflow-hidden">
                <img
                    src="https://cdn.shopify.com/s/files/1/1903/5289/products/Untitled-1_1_270x.jpg?v=1491406090"
                    alt="mobile"
                    className="w-full object-cover"
                />
                <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative bottom-[-30px]">
                    {productAction.map((item) => (
                        <Tippy key={item.title} content={item.title} placement="top">
                            <button className="w-11 h-11 flex justify-center items-center rounded-full product-action">
                                {item.icon}
                            </button>
                        </Tippy>
                    ))}
                </div>
            </Link>
            <Link to="/" className="mb-[6px] hover:text-main transition-colors">
                Xiaomi Mi Pad {data}
            </Link>
            <h2 className="mb-[10px] text-base text-main">$175.99 USD</h2>
        </div>
    )
}

export default ProductItem
