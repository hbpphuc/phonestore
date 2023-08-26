import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'components'
import * as apis from 'apis'
import { setProductInCart } from 'redux/order/orderSlice'
import { toast } from 'react-toastify'

const ProductInCart = ({ data, i, length }) => {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(data?.quantity)
    const [pInCart, setPInCart] = useState([])
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const res = await apis.findManyProduct(data?.product)
            setLoading(false)
            setPInCart(res?.data?.products)
        }
        getProduct()
    }, [data])

    useEffect(() => {
        const updateCart = async () => {
            const res = await apis.addToCart({
                quantity,
                product: data?.product,
                color: data?.color,
                price: pInCart[0]?.price,
                cart: true,
            })
            res?.status === 'success' ? dispatch(setProductInCart(quantity + 1)) : toast.warning(res?.message)
        }

        if (quantity <= pInCart[0]?.quantity) updateCart()
    }, [quantity, data?.product, data?.color])

    return (
        <div className={`w-full h-auto pb-5 flex gap-5 ${!i && 'border-b border-[#4b545c]'}`}>
            <div className="w-20 h-20 flex-none flex justify-center items-center">
                {loading ? (
                    <Skeleton className="w-20 h-20" />
                ) : (
                    <img
                        src={pInCart[0]?.imageCover}
                        alt={pInCart[0]?.name}
                        className="w-full h-full object-cover rounded"
                    />
                )}
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {loading ? (
                        <Skeleton className="h-5" />
                    ) : (
                        <Link
                            to={`/products/${pInCart[0]?.category?.slug}/${pInCart[0]?.slug}`}
                            className="text-lg line-clamp-1 hover:underline"
                        >
                            {pInCart[0]?.name}
                        </Link>
                    )}
                    {loading ? (
                        <Skeleton className="w-20 h-[14px]" />
                    ) : (
                        <h3 className="text-sm text-[#e0dfdf]">{data?.color}</h3>
                    )}
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
                                disabled={quantity >= pInCart[0]?.quantity && true}
                                className="w-6 h-6 flex justify-center items-center text-sm text-white bg-black disabled:bg-gray-300 disabled:text-[#1c1d1d]"
                            >
                                +
                            </Button>
                        </div>
                        <div className={`w-max flex ${length > 4 && 'mr-2'}`}>
                            {loading ? <Skeleton className="w-20" /> : <h2>${pInCart[0]?.price} USD</h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductInCart)
