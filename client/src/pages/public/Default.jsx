import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../../layouts'

const Default = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Default
