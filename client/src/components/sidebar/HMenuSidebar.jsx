import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'components'
import { navigatorMenu } from 'utils/menu'
import { adminRoutes } from 'routes/paths'

const HMenuSidebar = ({ user, onSetOpenMenu }) => {
    console.log(user)
    return (
        <div className="fixed top-0 left-0 w-[300px] h-screen flex flex-col bg-[#1c1d1d] text-white sidebar-shadow z-50 fade-in-effect">
            <div className="w-full h-20 flex items-center px-6 py-1 relative border-b border-admin">
                <span
                    className="absolute top-0 right-0 w-[78px] h-[78px] flex justify-center items-center text-gray-400 cursor-pointer"
                    onClick={() => {
                        onSetOpenMenu(false)
                    }}
                >
                    <Icon.IoMdCloseCircle size={30} />
                </span>
                <h1 className="text-2xl font-bold tracking-widest w-full flex justify-start items-center uppercase gradient-text">
                    Menu
                </h1>
            </div>
            <div className="flex-1 w-full flex flex-col justify-between px-6 relative">
                <ul className="w-full flex flex-col text-white">
                    {navigatorMenu.map((item, index) => (
                        <li
                            key={item.id}
                            className={`py-4 text-sm uppercase ${index !== navigatorMenu.length - 1 ? 'border-b' : ''}`}
                        >
                            <NavLink
                                to={item.path}
                                onClick={(isActive) => isActive && onSetOpenMenu(false)}
                                className={`w-full h-full inline-block ${({ isActive }) =>
                                    isActive ? 'text-main' : ''}`}
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div>
                    <ul className="w-full flex flex-col text-white border-t border-admin">
                        <li className="py-4 text-sm uppercase">
                            <NavLink
                                onClick={(isActive) => isActive && onSetOpenMenu(false)}
                                to={
                                    user?.data?.role === 'admin'
                                        ? `/${adminRoutes.admin}/${adminRoutes.adminDashboard}`
                                        : `/me`
                                }
                                className={`w-full h-full inline-block ${({ isActive }) =>
                                    isActive ? 'text-main' : ''}`}
                            >
                                {user?.data?.name}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HMenuSidebar
