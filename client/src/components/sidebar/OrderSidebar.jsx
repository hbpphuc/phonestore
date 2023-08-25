import React, { useState, useEffect } from 'react'
import { Button, Icon, Input, ProductInCart } from 'components'
import { useForm } from 'react-hook-form'

const OrderSidebar = ({ onSetOpenOrder, user, onSetIsNew }) => {
    console.log(user?.cart.map((item) => item.quantity))
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    return (
        <div className="fixed top-0 right-0 w-[400px] h-screen flex flex-col bg-[#1c1d1d] text-white sidebar-shadow">
            <div className="w-full h-20 flex items-center px-8 py-1 relative border-b border-admin">
                <Button
                    className="absolute top-0 right-0 w-[78px] h-[78px] flex justify-center items-center text-gray-400"
                    onClick={() => onSetOpenOrder(false)}
                >
                    <Icon.IoMdCloseCircle size={30} />
                </Button>
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
                                    onSetIsNew={onSetIsNew}
                                    // cart={user?.cart}
                                />
                            ))}
                        </div>
                        <div className="w-full h-auto pt-5 px-8 mb-4 flex flex-col gap-[10px] border-t border-[#4b545c] absolute bottom-0 bg-[#1c1d1d]">
                            <div className="w-full h-auto flex justify-between items-center">
                                <h1 className="uppercase text-sm font-bold tracking-wider">subtotal</h1>
                                <h1 className="text-lg">$10000</h1>
                            </div>
                            <div className="w-full h-auto flex justify-between items-center">
                                <Input
                                    id="voucher"
                                    placeHolder="Voucher"
                                    register={register}
                                    errors={errors}
                                    className="max-w-[180px] p-2 text-base bg-transparent border-b border-l border-[#656c72] text-gray-300 rounded-sm outline-none"
                                />
                                <h1 className="text-yellow-300 text-lg">$10000</h1>
                            </div>
                            <div>
                                <Button className="w-full py-3 flex justify-center items-center gap-3 bg-main rounded">
                                    <span className="uppercase font-medium">Check Out</span>
                                    <span>
                                        <Icon.MdShoppingCartCheckout size={24} />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderSidebar
