import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, ForgotForm, Icon, LoginForm, Popup, RegisterForm } from '../../components'
import { navigatorMenu } from '../../utils/menu'
import { adminRoutes } from '../../routes/paths'

const HMenuSidebar = ({ user, onSetOpenMenu, onLogout }) => {
    const [form, setForm] = useState(0)
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
                <ul className="w-full flex flex-col md:flex-row text-white">
                    {navigatorMenu.map((item, index) => (
                        <li
                            key={item.id}
                            className={`py-4 text-sm uppercase  cursor-pointer ${
                                index !== navigatorMenu.length - 1 ? 'border-b border-admin' : ''
                            }`}
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
                        {user ? (
                            <>
                                <li className="py-4 text-sm uppercase cursor-pointer ">
                                    <NavLink
                                        onClick={(isActive) => isActive && onSetOpenMenu(false)}
                                        to={
                                            user?.role === 'admin'
                                                ? `/${adminRoutes.admin}/${adminRoutes.adminDashboard}`
                                                : `/me`
                                        }
                                        className={`w-full h-full inline-block ${({ isActive }) =>
                                            isActive ? 'text-main' : ''}`}
                                    >
                                        {user?.name}
                                    </NavLink>
                                </li>
                                <li
                                    onClick={onLogout}
                                    className="flex justify-between items-center py-4 text-sm uppercase cursor-pointer"
                                >
                                    <span>Logout</span>
                                    <span>
                                        <Icon.BiLogOut size={24} />
                                    </span>
                                </li>
                            </>
                        ) : (
                            <li className="py-4 text-sm uppercase cursor-pointer">
                                <Popup
                                    button={
                                        <Button
                                            text="Sign In | Sign Up"
                                            className="text-sm font-normal text-white hover:text-main"
                                        />
                                    }
                                    styles="w-[300px]"
                                >
                                    {form === 0 ? (
                                        <LoginForm onSetForm={setForm} />
                                    ) : form === 1 ? (
                                        <RegisterForm onSetForm={setForm} />
                                    ) : (
                                        <ForgotForm onSetForm={setForm} />
                                    )}
                                </Popup>
                            </li>
                        )}
                    </ul>
                    <span className="flex md:hidden justify-center items-center py-4 text-sm text-[#999]">
                        &copy; Digital World
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HMenuSidebar
