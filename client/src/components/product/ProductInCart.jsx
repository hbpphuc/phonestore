import React, { memo, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'components'
import * as apis from 'apis'
import { setProductInCart } from 'redux/order/orderSlice'
import { toast } from 'react-toastify'

const ProductInCart = ({ data, i, length }) => {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(data?.quantity)
    const [value] = useDebounce(quantity, 500)

    useEffect(() => {
        const updateCart = async () => {
            const res = await apis.addToCart({
                quantity: value,
                product: data?.product?.id,
                color: data?.color,
                cart: true,
            })
            res?.status === 'success' ? dispatch(setProductInCart(value + 1)) : toast.warning(res?.message)
        }

        if (value <= data?.product?.quantity) updateCart()
    }, [value])

    return (
        <div className={`w-full h-auto pb-5 flex gap-5 ${!i && 'border-b border-[#4b545c]'}`}>
            <div className="w-20 h-20 flex-none flex justify-center items-center">
                <img
                    src={data?.product?.imageCover}
                    alt={data?.product?.name}
                    className="w-full h-full object-cover rounded"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <Link
                        to={`/products/${data?.product?.category?.slug}/${data?.product?.slug}`}
                        className="line-clamp-1 hover:underline"
                    >
                        {data?.product?.name}
                    </Link>

                    <h3 className="text-sm text-[#e0dfdf]">{data?.color}</h3>
                </div>
                <div>
                    <div className="w-full flex justify-between items-center gap-4">
                        <div className="w-max flex border border-[#343535]">
                            <Button
                                onClick={() => {
                                    setQuantity((prev) => prev - 1)
                                }}
                                disabled={quantity === 0 && true}
                                className="w-6 h-6 flex justify-center items-center text-sm text-white bg-black disabled:bg-gray-300 disabled:text-[#1c1d1d]"
                            >
                                -
                            </Button>
                            <div className="w-9 h-6 flex justify-center items-center">
                                <input
                                    value={quantity}
                                    readOnly
                                    className="w-full h-6 text-sm font-bold text-center border-l border-r border-[#343535] bg-black outline-none"
                                />
                            </div>
                            <Button
                                onClick={() => {
                                    setQuantity((prev) => prev + 1)
                                }}
                                disabled={quantity >= data?.product?.quantity && true}
                                className="w-6 h-6 flex justify-center items-center text-sm text-white bg-black disabled:bg-gray-300 disabled:text-[#1c1d1d]"
                            >
                                +
                            </Button>
                        </div>
                        <div className={`w-max flex ${length > 4 && 'mr-2'}`}>
                            <h2 className="flex items-center">
                                <Icon.TbCurrencyDollar size={20} />
                                <span>{data?.product?.price}</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductInCart)
