import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigatorMenu } from 'utils/menu'

const Navigation = () => {
    return (
        <div className="flex-1 flex justify-center">
            <ul className="w-full flex ">
                {navigatorMenu.map((item) => (
                    <li
                        key={item.id}
                        className="p-[14px_11px] text-sm text-secondary uppercase hover:text-main transition-colors"
                    >
                        <NavLink to={item.path} className={({ isActive }) => (isActive ? 'text-main' : '')}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navigation
