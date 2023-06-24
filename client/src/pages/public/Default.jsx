import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../layouts'

const Default = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Header />
            <Outlet />
        </div>
    )
}

export default Default
