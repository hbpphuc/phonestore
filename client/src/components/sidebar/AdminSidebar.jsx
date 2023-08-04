import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import adminlogo from 'assets/images/AdminLogo.png'
import { Link, NavLink } from 'react-router-dom'
import { adminSidebarMenu } from 'utils/menu'

const activeStyle = 'flex text-main border-l-4 border-main'

const AdminSidebar = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-auto p-[13px_8px] bg-adminMain flex justify-center items-center gap-3 border-b border-admin sticky top-0 z-10">
                <img src={adminlogo} alt="admin-logo" className="w-9 h-9 object-contain" />
                <Link to="/admin/dashboard" className="uppercase font-normal text-lg hover:underline">
                    administrator
                </Link>
            </div>
            <div className="w-full h-auto">
                <ul className="w-full">
                    <Sidebar width="full" backgroundColor="#343a40" style={{ border: 'none' }}>
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
