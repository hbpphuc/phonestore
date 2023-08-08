import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar, Icon } from 'components'

const LayoutAdmin = () => {
    return (
        <div className="w-full min-h-screen flex text-white">
            <div className="w-[280px] flex-none bg-adminMain sidebar-admin z-50">
                <AdminSidebar />
            </div>
            <div className="flex-auto h-[2000px] bg-adminPrimary relative">
                <div className="fixed top-0 w-full h-auto p-[13px_8px] bg-adminMain border-b border-admin">
                    <span className="cursor-pointer">
                        <Icon.HiMenu size={32} className="text-[#ffffffbf] hover:text-white transition-colors" />
                    </span>
                </div>
                <div className="w-full h-auto overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
