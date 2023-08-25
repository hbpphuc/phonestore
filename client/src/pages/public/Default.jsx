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
    console.log(productInCart)

    const [openOrder, setOpenOrder] = useState(false)
    const [user, setUser] = useState(null)
    const [isNew, setIsNew] = useState(false)

    useEffect(() => {
        const getCurUser = async () => {
            const res = await apis.getCurrentUser()
            if (res?.data?.data?.cart.length < 1) dispatch(setProductInCart(0))
            setUser(res?.data?.data)
        }
        getCurUser()
    }, [isNew, productInCart])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center relative">
            <Header onSetOpenOrder={setOpenOrder} cartItemCount={user?.cart?.length} />
            <Outlet />
            <Footer />
            {openOrder && <OrderSidebar onSetOpenOrder={setOpenOrder} user={user} onSetIsNew={setIsNew} />}
        </div>
    )
}

export default Default
