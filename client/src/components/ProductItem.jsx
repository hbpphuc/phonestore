import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import useModal from '../hooks/useModal'
import Popup from './Popup'
import ProdAction from './ProdAction'

const ProductItem = ({ data }) => {
    const { isShowing, toggle } = useModal()

    const isNew = true

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full h-auto mx-2 flex flex-col items-center product-item border">
                <div className="w-full h-[300px] mb-5 p-[15px] overflow-hidden relative flex flex-col items-center">
                    <div
                        className={`product-item-favourite ${
                            isNew ? 'bg-[#00d5d5] border-t-[#00d5d5]' : 'bg-[#ffb400] border-t-[#ffb400]'
                        }`}
                    >
                        <span className="absolute rounded-full left-1 top-[50%] translate-y-[-50%] w-[6px] h-[6px] bg-[white]"></span>
                        <span>New</span>
                    </div>
                    <div className="w-full h-full flex justify-center items-start">
                        <Link to="/">
                            <img
                                src={data.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'}
                                alt={data.name}
                                className="w-full h-full object-center"
                            />
                        </Link>
                    </div>
                    <ProdAction data={data} />
                </div>
                <Link to="/" className="mb-[6px] hover:text-main transition-colors line-clamp-1">
                    {data.name}
                </Link>
                <div className="flex mb-[10px] gap-4">
                    {false && <h2 className="text-base text-[#999] line-through">${data.price} USD</h2>}
                    <h2 className="text-base text-main">${data.price} USD</h2>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductItem)
