import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Breadcrumb, UserSidebar } from 'components'

const Private = () => {
    const { deviceWidth } = useSelector((state) => state.app)

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                {deviceWidth >= 768 && (
                    <div className="w-full h-auto py-5 mb-5 bg-[#f7f7f7] flex justify-center items-center">
                        <Breadcrumb />
                    </div>
                )}
            </div>
            <div className="w-full h-auto flex justify-center items-center mt-5 md:mt-0">
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
