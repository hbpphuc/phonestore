import React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, UserSidebar } from 'components'

const Private = () => {
    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto py-5 mb-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb />
                </div>
            </div>
            <div className="w-full h-auto flex justify-center items-center">
                <div className="w-main h-auto mb-5 flex">
                    <UserSidebar />
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Private
