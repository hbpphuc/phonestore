import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import adminlogo from 'assets/images/AdminLogo.png'
import { Link, NavLink } from 'react-router-dom'
import { adminSidebarMenu } from 'utils/menu'

const activeStyle = 'flex text-main border-l-4 border-main'

const AdminSidebar = ({ collapsed }) => {
    return (
        <div className={`fixed left-0 ${collapsed ? 'w-20' : 'w-[260px]'} h-full flex flex-col`}>
            <div className="w-full h-auto p-[13px_8px] bg-adminMain border-b border-admin">
                <Link
                    to="/admin/dashboard"
                    className=" flex justify-center items-center gap-3 uppercase font-normal text-lg hover:underline"
                >
                    <img src={adminlogo} alt="admin-logo" className="w-8 h-8 object-contain" />
                    {!collapsed && <span>administrator</span>}
                </Link>
            </div>
            <div className="w-full h-auto">
                <ul className="w-full">
                    <Sidebar width="full" backgroundColor="#343a40" style={{ border: 'none' }} collapsed={collapsed}>
                        <Menu>
                            {adminSidebarMenu.map((item) =>
                                item.subMenu ? (
                                    <SubMenu key={item.id} icon={item.icon} label={item.title}>
                                        {item.subMenu.map((sub) => (
                                            <NavLink
                                                key={sub.id}
                                                to={sub.path}
                                                className={({ isActive }) => (isActive ? activeStyle : '')}
                                            >
                                                <MenuItem>{sub.title}</MenuItem>
                                            </NavLink>
                                        ))}
                                    </SubMenu>
                                ) : (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        className={({ isActive }) => (isActive ? activeStyle : '')}
                                    >
                                        <MenuItem icon={item.icon}>{item.title}</MenuItem>
                                    </NavLink>
                                )
                            )}
                        </Menu>
                    </Sidebar>
                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar
