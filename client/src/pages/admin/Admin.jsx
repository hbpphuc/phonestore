import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar, Icon } from 'components'

const Admin = () => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="w-full min-h-screen flex text-white">
            <div className={`${collapsed ? 'w-20' : 'w-[260px]'} flex-none bg-adminMain sidebar-admin z-50`}>
                <AdminSidebar collapsed={collapsed} />
            </div>
            <div className="flex-auto h-auto bg-adminPrimary relative">
                <div className="fixed top-0 w-full h-auto p-[10px_8px] bg-adminMain border-b border-admin z-40">
                    <button onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
                        <Icon.HiMenu size={32} className="text-[#ffffffbf] hover:text-white transition-colors" />
                    </button>
                </div>
                <div className="w-full h-auto overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin
