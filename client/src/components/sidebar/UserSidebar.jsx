import React from 'react'
import { NavLink } from 'react-router-dom'
import { userSidebarMenu } from '../../utils/menu'

const UserSidebar = () => {
    return (
        <div className="w-full sm:w-[220px] md:w-[260px] h-full flex sm:flex-col z-0 mb-4">
            <ul className="w-full flex flex-wrap sm:flex-col justify-between sm:justify-start bg-[#f7f7f7]">
                {userSidebarMenu.map((item, index) => (
                    <li
                        key={item.id}
                        className={`flex-1 ${
                            index !== -userSidebarMenu.length - 1 ? 'border-l-2 border-[#fff]' : ''
                        } sm:border-none`}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `p-[10px] xl:p-3 flex gap-2 justify-center sm:justify-start items-center hover:text-main transition-colors ${
                                    isActive ? 'text-main border-b-2 sm:border-l-4 sm:border-b-0 border-main' : ''
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            <span className="text-sm md:text-base font-medium">{item.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserSidebar
