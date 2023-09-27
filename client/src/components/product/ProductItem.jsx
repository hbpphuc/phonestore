/* eslint-disable react/style-prop-object */
import React, { memo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { wishlist } from 'redux/user/userSlice'
import * as apis from 'apis'
import { publicRoutes } from 'routes/paths'
import { productAction } from 'utils/menu'
import InfoProduct from './InfoProduct'
import Popup from 'components/general/Popup'

const ProductItem = ({ data, cateType, detail, loading }) => {
    const { deviceWidth } = useSelector((state) => state.app)
    const { curUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

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
    }

    return (
        <div className="w-full px-[10px] h-auto flex justify-center items-center">
            <div className="w-full h-auto flex flex-col items-center product-item border">
                <div className="w-full h-auto p-2 sm:p-[15px] overflow-hidden relative flex flex-col items-center">
                    {!detail && loading === 0 && (
                        <div
                            className={`product-item-favourite ${
                                isNew ? 'bg-[#00d5d5] border-t-[#00d5d5]' : 'bg-[#ffb400] border-t-[#ffb400]'
                            }`}
                        >
                            <span className="absolute rounded-full left-1 top-[50%] translate-y-[-50%] w-1 sm:w-[6px] h-1 sm:h-[6px] bg-[white]"></span>
                            <span className="text-sm sm:text-base">New</span>
                        </div>
                    )}
                    <div className="w-full h-[140px] min-[400px]:h-[190px] min-[500px]:h-[240px] min-[600px]:h-[290px] flex justify-center items-start">
                        {loading > 0 ? (
                            <Skeleton className="w-[140px] h-[120px] sm:w-[260px] sm:h-[240px]" />
                        ) : (
                            <Link to={`${publicRoutes.products}/${cateType}/${data?.slug}`}>
                                <img src={data?.imageCover} alt={data?.name} />
                            </Link>
                        )}
                    </div>
                    {deviceWidth > 768 && (
                        <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative -bottom-16">
                            {productAction
                                .filter((el) => el.id !== 3)
                                .map((item) => (
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
                            {productAction
                                .filter((el) => el.id === 3)
                                .map((item) => (
                                    <Popup
                                        button={
                                            <button className="w-11 h-11 flex justify-center items-center rounded-full product-action">
                                                {item.icon}
                                            </button>
                                        }
                                        styles="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px]"
                                    >
                                        <InfoProduct data={data} />
                                    </Popup>
                                ))}
                        </div>
                    )}
                </div>
                {loading > 0 ? (
                    <Skeleton width={deviceWidth > 640 ? 200 : 100} />
                ) : (
                    <Link
                        to={`${publicRoutes.products}/${cateType}/${data?.slug}`}
                        className="text-sm sm:text-base mb-[6px] px-1 md:px-0 hover:text-main transition-colors line-clamp-1"
                    >
                        {data?.name}
                    </Link>
                )}
                {loading > 0 ? (
                    <Skeleton width={deviceWidth > 640 ? 100 : 60} />
                ) : (
                    <div className="flex text-sm sm:mb-[10px] gap-4">
                        {false && <h2 className="text-[#999] line-through">${data?.price} USD</h2>}
                        <h2 className=" text-main">${data?.price} USD</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(ProductItem)
