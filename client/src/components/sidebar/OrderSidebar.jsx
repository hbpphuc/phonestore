import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'components'

const OrderSidebar = ({ onSetOpenOrder, user, loading }) => {
    return (
        <div className="fixed top-0 right-0 w-[400px] h-screen bg-[#1c1d1d] text-white sidebar-shadow">
            <div className="w-full h-20 flex items-center px-8 py-1 relative border-b border-admin">
                <Button
                    className="absolute top-0 right-0 w-[78px] h-[78px] flex justify-center items-center text-gray-400"
                    onClick={() => onSetOpenOrder(false)}
                >
                    <Icon.IoMdCloseCircle size={30} />
                </Button>
                <h1 className="text-3xl font-bold tracking-widest w-full flex justify-start items-center uppercase gradient-text">
                    your order
                </h1>
            </div>
            <div className="w-full h-auto flex px-8 pt-[15px]">
                {user?.cart.length === 0 && <h1>Your cart is currently empty.</h1>}
            </div>
        </div>
    )
}

export default OrderSidebar
