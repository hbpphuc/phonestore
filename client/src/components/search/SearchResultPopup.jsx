import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components'

const SearchResultPopup = ({ data, onSetFocus }) => {
    return (
        <div className="w-full h-[300px] md:h-[400px] z-50 overflow-auto text-sm">
            <h2 className="w-full p-[4px_8px] bg-[#f8f9fa] text-[#6c757d] cursor-default select-none">
                Products in your search
            </h2>
            <div className="w-full px-2">
                {data?.length > 0 ? (
                    data?.map((item, index) => (
                        <div
                            key={item.id}
                            className={`w-full py-2 flex items-center gap-3 ${
                                index < data?.length - 1 && 'border-b border-[#d5d5d5]'
                            }`}
                        >
                            <Link
                                onClick={() => onSetFocus(false)}
                                to={`/products/${item.category.slug}/${item.slug}`}
                                className="w-12 h-12 md:w-20 md:h-20 flex justify-center items-center"
                            >
                                <img src={item.imageCover} alt={item.name} className="object-cover" />
                            </Link>
                            <div className="flex-1 flex flex-col justify-start gap-1">
                                <Link
                                    onClick={() => onSetFocus(false)}
                                    to={`/products/${item.category.slug}/${item.slug}`}
                                    className="text-[#333] ml-1 text-sm md:text-base font-medium"
                                >
                                    {item.name}
                                </Link>
                                <h3 className="flex items-center text-[#e83a45] text-[10px] md:text-sm font-bold">
                                    <Icon.TbCurrencyDollar />
                                    <span>{item.price}</span>
                                </h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="w-full p-2 text-red-700 text-base font-medium text-center">
                        No product found with that name
                    </h1>
                )}
            </div>
        </div>
    )
}

export default SearchResultPopup
