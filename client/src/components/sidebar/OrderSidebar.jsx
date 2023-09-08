import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { loadStripe } from '@stripe/stripe-js'
import { useDebounce } from 'use-debounce'
import { PuffLoader } from 'react-spinners'
import { Button, Icon, ProductInCart, Loading } from 'components'
import * as apis from 'apis'
import { toast } from 'react-toastify'

const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const OrderSidebar = ({ onSetOpenOrder, user }) => {
    const [couponCode, setCouponCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [couponItem, setCouponItem] = useState(null)

    const [checkout, setCheckout] = useState(null)

    const [value] = useDebounce(couponCode, 700)

    const total = user?.cart?.reduce((init, curr) => init + curr.quantity * curr.product?.price, 0)

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        const getAllCoupon = async () => {
            setIsLoading(true)
            const res = await apis.getAllCoupon()
            setIsLoading(false)

            const cpItem = res?.data?.data?.find((item) => item.code.find((el) => el === value))

            if (cpItem) {
                setIsValid(true)
                setCouponItem(cpItem)
            } else {
                setIsValid(false)
            }
        }
        if (value.length > 0) getAllCoupon()
    }, [value, isValid])

    let totalDiscount

    if (couponItem?.type === 'percent') {
        totalDiscount = (total * couponItem?.discount) / 100
    }

    if (couponItem?.type === 'price') {
        totalDiscount = total - couponItem?.discount
    }

    const onSubmit = async (data) => {
        const dataObj = {
            ...data,
            cart: user?.cart,
        }
        const res = await apis.getCheckoutSession(dataObj)
        console.log(res)
        if (res?.status === 'success') {
            setCheckout(res?.data)
        } else toast(res?.message)
    }

    // useEffect(() => {
    //     const redirectCheckout = async () => {
    //         await stripe.redirectToCheckout({
    //             sessionId: checkout?.session.id,
    //         })
    //     }
    //     checkout && redirectCheckout()
    // }, [checkout])

    return (
        <div className="fixed top-0 right-0 w-[400px] h-screen flex flex-col bg-[#1c1d1d] text-white sidebar-shadow">
            <div className="w-full h-20 flex items-center px-6 py-1 relative border-b border-admin">
                <span
                    className="absolute top-0 right-0 w-[78px] h-[78px] flex justify-center items-center text-gray-400 cursor-pointer"
                    onClick={() => onSetOpenOrder(false)}
                >
                    <Icon.IoMdCloseCircle size={30} />
                </span>
                <h1 className="text-2xl font-bold tracking-widest w-full flex justify-start items-center uppercase gradient-text">
                    your order
                </h1>
            </div>
            <div className="flex-1 w-full flex px-6 relative">
                {!user || user?.cart.length === 0 ? (
                    <h1 className="pt-[15px]">Your cart is currently empty.</h1>
                ) : (
                    <div className="w-full h-auto flex flex-col items-center">
                        <div className="w-full max-h-[560px] my-[15px] flex flex-col items-center gap-5 overflow-auto scroll-m-0 ">
                            {user?.cart?.map((item, index) => (
                                <ProductInCart
                                    key={item._id}
                                    data={item}
                                    i={user?.cart.length - 1 === index}
                                    length={user?.cart.length}
                                />
                            ))}
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full h-auto pt-5 px-6 mb-4 flex flex-col gap-[10px] border-t border-[#4b545c] absolute bottom-0 bg-[#1c1d1d]"
                        >
                            <div className="w-full h-auto flex justify-between items-center">
                                <h1 className="uppercase text-sm font-bold tracking-wider">subtotal</h1>
                                <h1
                                    className={`${
                                        value && isValid ? 'line-through text-lg' : 'text-yellow-300 text-2xl'
                                    } flex justify-center items-center `}
                                >
                                    <Icon.TbCurrencyDollar size={20} />
                                    <span className="leading-[18px]">{total}</span>
                                </h1>
                            </div>
                            <div className="w-full h-auto flex justify-between items-center gap-2">
                                <div className="flex-1 flex relative">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Coupon"
                                        {...register('coupon', {
                                            onChange: (e) => {
                                                setCouponCode(e.target.value)
                                            },
                                        })}
                                        className="w-full mb-3 p-2 text-base bg-transparent border-b border-l border-[#656c72] text-gray-300 rounded-sm outline-none"
                                    />

                                    <span
                                        className={`${
                                            value && value.length > 0 ? 'flex' : 'hidden'
                                        } justify-center items-center absolute right-0 top-1`}
                                    >
                                        {isLoading ? (
                                            <span className="w-7 h-7 flex justify-center items-center">
                                                <Loading type={PuffLoader} color="#ffffff" size={20} />
                                            </span>
                                        ) : isValid ? (
                                            <Icon.BiCheck size={28} color="#4ade80" />
                                        ) : (
                                            <Icon.IoClose size={28} color="#ef4444" />
                                        )}
                                    </span>
                                </div>
                                {value && isValid && couponItem && (
                                    <h1 className="text-yellow-300 text-2xl whitespace-nowrap flex justify-center items-center">
                                        <Icon.TbCurrencyDollar size={22} />
                                        <span className="leading-[24px]">{totalDiscount}</span>
                                    </h1>
                                )}
                            </div>
                            <div>
                                <Button className="w-full py-3 flex justify-center items-center gap-3 bg-main rounded">
                                    <span className="uppercase font-medium">Check Out</span>
                                    <span>
                                        <Icon.MdShoppingCartCheckout size={24} />
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderSidebar
