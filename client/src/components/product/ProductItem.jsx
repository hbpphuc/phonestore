/* eslint-disable react/style-prop-object */
import React, { memo, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import useModal from 'hooks/useModal'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { wishlist } from 'redux/user/userSlice'
import * as apis from 'apis'
import { publicRoutes } from 'routes/paths'
import { productAction } from 'utils/menu'
import InfoProduct from './InfoProduct'
import Popup from 'components/general/Popup'
import Icon from 'components/general/Icons'

const ProductItem = ({ data, cateType, detail, loading }) => {
    const { curUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { isShowing, toggle } = useModal()

    const isNew = true
    const navigate = useNavigate()

    const wishlistRef = useRef()

    const handleClickActionBtn = async (item, id) => {
        if (item.id === 1) {
            const res = await apis.addToWishlist({ pId: id })
            res?.status !== 'success' && toast.error(res?.message)

            if (res?.data?.wishlist?.wishlist?.includes(id)) {
                dispatch(wishlist(true))
                wishlistRef?.current.classList.add('wishlist-action')
            } else {
                dispatch(wishlist(false))
                wishlistRef?.current.classList.remove('wishlist-action')
            }
        }

        if (item.id === 2) {
            navigate(`${publicRoutes.products}/${cateType}/${data?.slug}`)
        }

        if (item.id === 3) {
            toggle()
        }
    }

    return (
        <>
            <div className="w-full h-auto flex justify-center items-center">
                <div className="w-full h-auto flex flex-col items-center product-item border">
                    <div className="w-full h-auto p-[15px] overflow-hidden relative flex flex-col items-center">
                        {!detail && loading === 0 && (
                            <div
                                className={`product-item-favourite ${
                                    isNew ? 'bg-[#00d5d5] border-t-[#00d5d5]' : 'bg-[#ffb400] border-t-[#ffb400]'
                                }`}
                            >
                                <span className="absolute rounded-full left-1 top-[50%] translate-y-[-50%] w-[6px] h-[6px] bg-[white]"></span>
                                <span>New</span>
                            </div>
                        )}
                        <div className="w-full h-[120px] sm:h-[240px] flex justify-center items-start">
                            {loading > 0 ? (
                                <Skeleton className="w-[260px] h-[240px]" />
                            ) : (
                                <Link to={`${publicRoutes.products}/${cateType}/${data?.slug}`}>
                                    <img src={data?.imageCover} alt={data?.name} />
                                </Link>
                            )}
                        </div>
                        <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative -bottom-16">
                            {productAction.map((item) => (
                                <Tippy key={item.id} content={item.title} placement="top">
                                    <button
                                        onClick={() => handleClickActionBtn(item, data._id)}
                                        ref={item.id === 1 && wishlistRef}
                                        className={`w-11 h-11 flex justify-center items-center rounded-full product-action ${
                                            item.id === 1 && curUser?.data?.wishlist.includes(data._id)
                                                ? 'wishlist-action'
                                                : ''
                                        }`}
                                    >
                                        {item.icon}
                                    </button>
                                </Tippy>
                            ))}
                        </div>
                    </div>
                    {loading > 0 ? (
                        <Skeleton width={200} />
                    ) : (
                        <Link
                            to={`${publicRoutes.products}/${cateType}/${data?.slug}`}
                            className="mb-[6px] hover:text-main transition-colors line-clamp-1"
                        >
                            {data?.name}
                        </Link>
                    )}
                    {loading > 0 ? (
                        <Skeleton width={100} />
                    ) : (
                        <div className="flex text-sm mb-[10px] gap-4">
                            {false && <h2 className="text-[#999] line-through">${data?.price} USD</h2>}
                            <h2 className=" text-main">${data?.price} USD</h2>
                        </div>
                    )}
                </div>
            </div>
            {isShowing && (
                <Popup modalIsOpen={isShowing} closeModal={toggle}>
                    <div className="w-1/2 h-auto flex flex-col p-5 bg-white overflow-hidden relative">
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
