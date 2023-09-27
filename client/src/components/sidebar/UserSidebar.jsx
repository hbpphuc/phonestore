import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link, NavLink } from 'react-router-dom'
import { userSidebarMenu } from 'utils/menu'

const activeStyle = 'flex text-main border-l-4 border-main'

const UserSidebar = () => {
    return (
        <div className="sm:w-[200px] md:w-[260px] h-full flex flex-col z-0">
            <div className="w-full h-auto">
                <ul className="w-full">
                    <Sidebar width="full" backgroundColor="#f7f7f7" style={{ border: 'none' }}>
                        <Menu>
                            {userSidebarMenu.map((item) =>
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
                                        <MenuItem icon={item.icon} className="text-sm md:text-base font-medium">
                                            {item.title}
                                        </MenuItem>
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

export default UserSidebar
