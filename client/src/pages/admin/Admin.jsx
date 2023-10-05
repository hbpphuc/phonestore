import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import Tippy from '@tippyjs/react'
import { Icon } from '../../components'
import adminlogo from '../../assets/images/AdminLogo.png'
import { adminSidebarMenu } from '../../utils/menu'

const Admin = () => {
    const [collapsed, setCollapsed] = useState(true)
    const { deviceWidth } = useSelector((state) => state.app)

    return (
        <div className="w-full min-h-screen flex text-white">
            <div className="flex-auto h-auto bg-adminPrimary relative">
                <div className="flex justify-between sm:justify-start items-center fixed top-0 w-full h-[60px] bg-adminMain border-b border-admin z-40 sm:gap-5 px-[10px]">
                    <Link
                        to="/admin/dashboard"
                        className=" flex justify-center items-center gap-2 uppercase font-normal hover:underline sm:pr-5 sm:border-r-2 border-admin"
                    >
                        <img
                            src={adminlogo}
                            alt="admin-logo"
                            className="w-6 h-6 sm:w-8 md:w-10 lg:w-12 sm:h-8 md:h-10 lg:h-12 object-contain"
                        />
                        <span className="hidden sm:inline-block">Administrator</span>
                    </Link>
                    <div className="flex items-center gap-5">
                        {deviceWidth >= 640 && (
                            <button onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
                                {!collapsed ? (
                                    <Icon.IoClose
                                        size={32}
                                        className="text-[#ffffffbf] hover:text-white transition-colors"
                                    />
                                ) : (
                                    <Icon.HiMenu
                                        size={32}
                                        className="text-[#ffffffbf] hover:text-white transition-colors"
                                    />
                                )}
                            </button>
                        )}
                        {(!collapsed || deviceWidth < 640) && (
                            <Sidebar width="full" backgroundColor="#343a40" style={{ border: 'none' }}>
                                <Menu>
                                    {adminSidebarMenu.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            to={item.path}
                                            className={({ isActive }) => (isActive ? 'flex !text-main' : '')}
                                        >
                                            <Tippy content={item.title} placement="bottom">
                                                <MenuItem icon={item.icon}></MenuItem>
                                            </Tippy>
                                        </NavLink>
                                    ))}
                                </Menu>
                            </Sidebar>
                        )}
                    </div>
                    <Link
                        to="/"
                        target={deviceWidth < 640 ? '_self' : '_blank'}
                        className="sm:pl-5 sm:border-l-2 border-admin"
                    >
                        <Icon.BiSolidHome
                            size={deviceWidth < 640 ? 24 : 30}
                            className="text-[#ffffffbf] hover:text-white transition-colors"
                        />
                    </Link>
                </div>
                <div className="w-full h-full overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin
