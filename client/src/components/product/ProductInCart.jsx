import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { Button, Input } from 'components'
import * as apis from 'apis'
import { useSelector } from 'react-redux'

const ProductInCart = ({ data, i, length, onSetIsNew }) => {
    const { productInCart } = useSelector((state) => state.order)

    const [qt, setQt] = useState(data?.quantity)
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
    }, [data, qt, productInCart])

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
                        <h1 className="text-lg line-clamp-1">{pInCart[0]?.name}</h1>
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
                                onClick={(e) => {
                                    e.preventDefault()
                                    setQt((prev) => prev - 1)
                                    onSetIsNew((prev) => !prev)
                                }}
                                disabled={qt === 0 && true}
                                className="w-6 h-6 flex justify-center items-center text-sm text-white bg-black"
                            >
                                -
                            </Button>
                            <div className="w-9 h-6">
                                <Input
                                    id="quantity"
                                    register={register}
                                    value={qt}
                                    validate={{ required: true }}
                                    errors={errors}
                                    errmsg="Quantity is required."
                                    readOnly
                                    className="w-full h-6 text-sm font-bold text-center border-l border-r border-[#343535] bg-black"
                                />
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setQt((prev) => prev + 1)
                                    onSetIsNew((prev) => !prev)
                                }}
                                className="w-6 h-6 flex justify-center items-center text-sm text-white bg-black"
                            >
                                +
                            </Button>
                        </div>
                        <div className={`w-max flex ${length > 4 && 'mr-2'}`}>
                            {loading ? <Skeleton className="w-20" /> : <h2>${pInCart[0]?.price}</h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductInCart)
