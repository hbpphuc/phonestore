import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link, NavLink } from 'react-router-dom'
import { adminSidebarMenu } from 'utils/menu'
import Tippy from '@tippyjs/react'

const AdminSidebar = ({ collapsed }) => {
    return (
        <div className={`fixed left-0 top-0 bottom-0 w-20 h-screen ${collapsed ? 'hidden' : 'flex'} flex-col`}>
            <div className="w-full h-auto">
                <Sidebar width="full" backgroundColor="#343a40" style={{ border: 'none' }}>
                    <Menu>
                        {adminSidebarMenu.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) => (isActive ? 'flex text-main border border-main' : '')}
                            >
                                <Tippy content={item.title} placement="bottom">
                                    <MenuItem icon={item.icon}></MenuItem>
                                </Tippy>
                            </NavLink>
                        ))}
                    </Menu>
                </Sidebar>
            </div>
        </div>
    )
}

export default AdminSidebar
