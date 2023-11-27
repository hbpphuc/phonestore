import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FadeLoader } from 'react-spinners'
import { Footer, Header } from '../../layouts'
import { OrderSidebar, Loading } from '../../components'
import * as apis from '../../apis'
import { setProductInCart } from '../../redux/order/orderSlice'

const Default = () => {
    const dispatch = useDispatch()
    const { productInCart } = useSelector((state) => state.order)

    const [openOrder, setOpenOrder] = useState(false)
    const [user, setUser] = useState(null)

    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        const getCurUser = async () => {
            const res = await apis.getCurrentUser()
            if (res?.data?.data?.cart.length < 1) dispatch(setProductInCart(0))
            setUser(res?.data?.data)
        }
        getCurUser()
    }, [productInCart])

    useEffect(() => {
        const check = async () => {
            const res = await apis.getAllCategory()
            if (res?.status === 'success') setIsRunning(true)
        }
        check()
    }, [isRunning])

    return (
        <>
            {isRunning ? (
                <div className="w-full h-full flex flex-col justify-center items-center relative">
                    <Header onSetOpenOrder={setOpenOrder} user={user} />
                    <Outlet />
                    <Footer />
                    {openOrder && <OrderSidebar onSetOpenOrder={setOpenOrder} user={user} />}
                </div>
            ) : (
                <div className="w-screen h-screen flex flex-col justify-center items-center px-[10px]">
                    <h2 className="w-full lg:w-[780px] flex justify-center mb-2 text-base">
                        This web server is deployed in Render and using Free instance. So, Render spins down a Free web
                        service that goes 15 minutes without receiving inbound traffic. Please wait a few minutes to
                        start web service.
                    </h2>
                    <FadeLoader color="#0eb1f2" margin={4} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            )}
        </>
    )
}

export default Default
