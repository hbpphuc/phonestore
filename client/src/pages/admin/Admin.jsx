import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AdminSidebar, Icon } from 'components'

const Admin = () => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="w-full min-h-screen flex text-white">
            <div className={`${collapsed ? 'w-20' : 'w-[260px]'} flex-none bg-adminMain sidebar-shadow z-50`}>
                <AdminSidebar collapsed={collapsed} />
            </div>
            <div className="flex-auto h-auto bg-adminPrimary relative">
                <div className="flex items-center fixed top-0 w-full h-auto p-[13px_8px] bg-adminMain border-b border-admin z-40 gap-5">
                    <button onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
                        <Icon.HiMenu size={32} className="text-[#ffffffbf] hover:text-white transition-colors" />
                    </button>
                    <Link to="/" target="_blank">
                        <Icon.BiSolidHome size={30} className="text-[#ffffffbf] hover:text-white transition-colors" />
                    </Link>
                </div>
                <div className="w-full h-auto overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin
