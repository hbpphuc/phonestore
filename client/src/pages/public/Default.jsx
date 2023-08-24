import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from 'layouts'
import { OrderSidebar } from 'components'
import * as apis from 'apis'

const Default = () => {
    const [openOrder, setOpenOrder] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCurUser = async () => {
            setLoading(true)
            const res = await apis.getCurrentUser()
            setLoading(false)

            setUser(res?.data?.data)
        }
        getCurUser()
    }, [])
    return (
        <div className="w-full h-full flex flex-col justify-center items-center relative">
            <Header onSetOpenOrder={setOpenOrder} cartItemCount={user?.cart?.length} />
            <Outlet />
            <Footer />
            {openOrder && <OrderSidebar onSetOpenOrder={setOpenOrder} user={user} loading={loading} />}
        </div>
    )
}

export default Default
