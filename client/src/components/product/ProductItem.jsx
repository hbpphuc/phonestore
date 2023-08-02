/* eslint-disable react/style-prop-object */
import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import useModal from 'hooks/useModal'

import { publicRoutes } from 'routes/paths'
import { productAction } from 'utils/menu'
import InfoProduct from './InfoProduct'
import Popup from 'components/general/Popup'
import Icon from 'components/general/Icons'

const ProductItem = ({ data, cateType, detail }) => {
    const { isShowing, toggle } = useModal()
    const isNew = true
    const navigate = useNavigate()

    const handleClickActionBtn = (item) => {
        if (item.id === 2) {
            navigate(`${publicRoutes.products}/${cateType}/${data?.slug}`)
        }
        if (item.id === 3) {
            toggle()
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className="w-full h-auto mx-2 flex flex-col items-center product-item border">
                    <div className="w-full h-[300px] mb-5 p-[15px] overflow-hidden relative flex flex-col items-center">
                        {!detail && (
                            <div
                                className={`product-item-favourite ${
                                    isNew ? 'bg-[#00d5d5] border-t-[#00d5d5]' : 'bg-[#ffb400] border-t-[#ffb400]'
                                }`}
                            >
                                <span className="absolute rounded-full left-1 top-[50%] translate-y-[-50%] w-[6px] h-[6px] bg-[white]"></span>
                                <span>New</span>
                            </div>
                        )}
                        <div className="w-full h-full flex justify-center items-start">
                            <Link to={`${publicRoutes.products}/${cateType}/${data?.slug}`}>
                                <img
                                    src={data?.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'}
                                    alt={data?.name}
                                    className="w-full h-full object-center"
                                />
                            </Link>
                        </div>
                        <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative -bottom-16">
                            {productAction.map((item) => (
                                <Tippy key={item.id} content={item.title} placement="top">
                                    <button
                                        onClick={() => handleClickActionBtn(item)}
                                        className="w-11 h-11 flex justify-center items-center rounded-full product-action"
                                    >
                                        {item.icon}
                                    </button>
                                </Tippy>
                            ))}
                        </div>
                    </div>
                    <Link
                        to={`${publicRoutes.products}/${cateType}/${data?.slug}`}
                        className="mb-[6px] hover:text-main transition-colors line-clamp-1"
                    >
                        {data?.name}
                    </Link>
                    <div className="flex mb-[10px] gap-4">
                        {false && <h2 className="text-base text-[#999] line-through">${data?.price} USD</h2>}
                        <h2 className="text-base text-main">${data?.price} USD</h2>
                    </div>
                </div>
            </div>
            {isShowing && (
                <Popup modalIsOpen={isShowing} closeModal={toggle}>
                    <div className="max-w-[1000px] h-[640px] flex flex-col p-5 bg-white overflow-hidden relative">
                        <div className="w-10 h-10 absolute top-0 right-0">
                            <button onClick={toggle} className="w-full h-full flex justify-center items-center">
                                <Icon.GrClose size={26} />
                            </button>
                        </div>
                        <InfoProduct data={data} />
                    </div>
                </Popup>
            )}
        </>
    )
}

export default memo(ProductItem)
