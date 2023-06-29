import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { productAction } from '../utils/menu'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const ProductItem = ({ data }) => {
    const isNew = true

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full h-[400px] mx-2 flex flex-col items-center product-item border relative">
                <div
                    className={`product-item-favourite ${
                        isNew ? 'bg-[#00d5d5] border-t-[#00d5d5]' : 'bg-[#ffb400] border-t-[#ffb400]'
                    }`}
                >
                    <span className="absolute rounded-full left-1 top-[50%] translate-y-[-50%] w-[6px] h-[6px] bg-[white]"></span>
                    <span>New</span>
                </div>
                <Link to="/" className="w-full h-[305px] mb-5 p-[15px] overflow-hidden">
                    <img
                        src={data.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'}
                        alt={data.name}
                        className="w-full h-full object-contain"
                    />
                    <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative bottom-[-50px]">
                        {productAction.map((item) => (
                            <Tippy key={item.title} content={item.title} placement="top">
                                <button className="w-11 h-11 flex justify-center items-center rounded-full product-action">
                                    {item.icon}
                                </button>
                            </Tippy>
                        ))}
                    </div>
                </Link>
                <Link to="/" className="mb-[6px] hover:text-main transition-colors line-clamp-1">
                    {data.name}
                </Link>
                <h2 className="mb-[10px] text-base text-main">${data.price} USD</h2>
            </div>
        </div>
    )
}

export default memo(ProductItem)
