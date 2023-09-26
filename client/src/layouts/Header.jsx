import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { useDispatch, useSelector } from 'react-redux'
import {
    Popup,
    LoginForm,
    RegisterForm,
    ForgotForm,
    Button,
    Icon,
    Navigation,
    SearchBar,
    HMenuSidebar,
} from '../components'
import { adminRoutes } from 'routes/paths'
import logo from '../assets/images/logo.png'
import { logoutt } from '../redux/user/userSlice'
import { getCurrentUser } from '../redux/user/userAction'
import * as apis from '../apis'

const Header = ({ onSetOpenOrder, cartItemCount }) => {
    const [form, setForm] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn, curUser } = useSelector((state) => state.user)
    const { deviceWidth } = useSelector((state) => state.app)

    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrentUser())
    }, [dispatch, isLoggedIn])

    const logout = async () => {
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure?',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.logout()
                if (res.status === 'success') {
                    dispatch(logoutt({ isLoggedIn: false }))
                    Swal.fire('Congratulation!', 'User logout successfully!', 'success').then(() => navigate(0))
                }
            }
        })
    }

    return (
        <>
            <div className="w-full h-auto flex flex-col justify-center items-center">
                {deviceWidth >= 768 && (
                    <div className="w-full flex justify-center items-center border-b border-[#0000000d] py-[10px]">
                        <div className="w-main flex justify-between px-[10px] xl:px-0">
                            <div className="flex">
                                <p className="text-sm font-normal text-[#848484]">Welcome to our Store!</p>
                            </div>
                            <div className="flex relative">
                                {!curUser ? (
                                    <Popup
                                        button={
                                            <Button
                                                text="Sign In | Sign Up"
                                                className="text-sm font-normal text-[#848484] hover:text-main"
                                            />
                                        }
                                        styles="w-[300px] sm:w-[400px] md:w-[500px]"
                                    >
                                        {form === 0 ? (
                                            <LoginForm onSetForm={setForm} />
                                        ) : form === 1 ? (
                                            <RegisterForm onSetForm={setForm} />
                                        ) : (
                                            <ForgotForm onSetForm={setForm} />
                                        )}
                                    </Popup>
                                ) : (
                                    <Menu
                                        menuButton={
                                            <MenuButton className="text-[#848484] hover:text-main">
                                                {curUser?.data?.name}
                                            </MenuButton>
                                        }
                                        menuClassName="border rounded-[4px] bg-white z-10"
                                    >
                                        <MenuItem className="header-menu-item">
                                            <Link
                                                className="flex items-center"
                                                to={
                                                    curUser?.data?.role === 'admin'
                                                        ? `/${adminRoutes.admin}/${adminRoutes.adminDashboard}`
                                                        : `/me`
                                                }
                                            >
                                                <span className="mr-2">
                                                    <Icon.FaUserCircle size={20} />
                                                </span>
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <hr />
                                        <MenuItem onClick={logout} className="header-menu-item">
                                            <span className="mr-2">
                                                <Icon.BiLogOut size={20} />
                                            </span>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full h-16 sm:h-20 md:h-auto flex justify-center items-center px-[10px] md:p-[30px_10px] xl:px-0">
                    <div className="w-main flex items-center justify-between">
                        {deviceWidth < 640 && (
                            <div className="w-max md:flex-1 flex justify-start">
                                <span
                                    onClick={() => {
                                        setOpenMenu(true)
                                    }}
                                    className="flex justify-center items-center cursor-pointer"
                                >
                                    <Icon.HiMenu size={32} />
                                </span>
                            </div>
                        )}
                        <div className="flex-1 flex justify-center sm:justify-start">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-[200px] sm:w-full h-full object-cover" />
                            </Link>
                        </div>
                        <div className="w-[50%] flex-none px-5 lg:px-[57px] mx-5 hidden md:flex justify-center items-center">
                            <SearchBar />
                        </div>
                        <div className="w-max md:flex-1 flex justify-end gap-3">
                            {deviceWidth >= 640 && deviceWidth < 768 && (
                                <Popup
                                    button={
                                        <span>
                                            <Icon.FaUserCircle size={24} />
                                        </span>
                                    }
                                    styles="w-[300px] sm:w-[400px] md:w-[500px]"
                                >
                                    {form === 0 ? (
                                        <LoginForm onSetForm={setForm} />
                                    ) : form === 1 ? (
                                        <RegisterForm onSetForm={setForm} />
                                    ) : (
                                        <ForgotForm onSetForm={setForm} />
                                    )}
                                </Popup>
                            )}
                            <span
                                onClick={() => {
                                    onSetOpenOrder(true)
                                }}
                                className="flex justify-center items-center cursor-pointer"
                            >
                                <div className="hidden md:flex flex-col justify-center items-end">
                                    <span>Your Cart</span>
                                    <div className="flex justify-center items-center gap-1 text-base font-bold">
                                        <span className="text-red-500">{cartItemCount > 0 ? cartItemCount : 0}</span>
                                        <span>ITEM</span>
                                    </div>
                                </div>
                                <span className="md:ml-4 md:text-main">
                                    {deviceWidth >= 768 ? (
                                        <Icon.RiShoppingBasketFill size={32} />
                                    ) : (
                                        <div className="relative">
                                            <Icon.ImCart size={24} />
                                            {cartItemCount > 0 && (
                                                <span className="w-[25px] h-[18px] text-center text-sm font-medium text-white rounded-full absolute -top-3 -right-2 bg-red-500">
                                                    {cartItemCount}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center border-t border-[#0000000d] px-0 sm:px-[10px] xl:px-0">
                    {deviceWidth >= 640 && (
                        <div className={`${deviceWidth >= 768 ? 'w-main' : 'flex-1'}`}>
                            <Navigation />
                        </div>
                    )}
                    {deviceWidth < 768 && <SearchBar />}
                </div>
            </div>
            {deviceWidth < 640 && openMenu && <HMenuSidebar onSetOpenMenu={setOpenMenu} user={curUser} />}
        </>
    )
}

export default Header
