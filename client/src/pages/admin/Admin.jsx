import { AdminSidebar } from 'components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
    return (
        <div className="w-full min-h-screen flex text-white">
            <div className="w-[327px] flex-none bg-adminMain relative">
                <AdminSidebar />
            </div>
            <div className="flex-auto bg-adminPrimary">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutAdmin
