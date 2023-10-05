import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Footer, Header } from 'layouts'
import { OrderSidebar } from 'components'
import * as apis from 'apis'
import { setProductInCart } from 'redux/order/orderSlice'

const Default = () => {
    const dispatch = useDispatch()
    const { productInCart } = useSelector((state) => state.order)

    const [openOrder, setOpenOrder] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getCurUser = async () => {
            const res = await apis.getCurrentUser()
            if (res?.data?.data?.cart.length < 1) dispatch(setProductInCart(0))
            setUser(res?.data?.data)
        }
        getCurUser()
    }, [productInCart])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center relative">
            <Header onSetOpenOrder={setOpenOrder} user={user} />
            <Outlet />
            <Footer />
            {openOrder && <OrderSidebar onSetOpenOrder={setOpenOrder} user={user} />}
        </div>
    )
}

export default Default
