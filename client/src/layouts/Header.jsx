import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { useDispatch, useSelector } from 'react-redux'
import { Popup, LoginForm, RegisterForm, ForgotForm, Button, Icon, Navigation, SearchBar } from '../components'
import useModal from '../hooks/useModal'
import { adminRoutes } from 'routes/paths'
import logo from '../assets/images/logo.png'
import { getCurrentUser } from '../redux/user/userAction'
import * as apis from '../apis'
import { logoutt } from '../redux/user/userSlice'

const Header = ({ onSetOpenOrder, cartItemCount }) => {
    const { isShowing, toggle } = useModal()
    const [form, setForm] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn, curUser } = useSelector((state) => state.user)
    const { deviceWidth } = useSelector((state) => state.app)

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
                        <div className="w-main flex justify-between ">
                            <div className="flex">
                                <p className="text-sm font-normal text-[#848484]">Welcome to our Store!</p>
                            </div>
                            <div className="flex relative">
                                {!curUser ? (
                                    <Button
                                        text="Sign In | Sign Up"
                                        onClick={toggle}
                                        className="text-sm font-normal px-[10px] text-[#848484] hover:text-main"
                                    />
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
                <div className="w-full h-20 md:h-auto flex justify-center items-center px-5 md:p-[30px_0px]">
                    <div className="w-main flex items-center justify-between">
                        {deviceWidth < 768 && (
                            <div className="w-max md:flex-1 flex justify-start">
                                <span onClick={() => {}} className="flex justify-center items-center cursor-pointer">
                                    <Icon.HiMenu size={32} />
                                </span>
                            </div>
                        )}
                        <div className="flex-1 flex justify-center md:justify-start">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-full h-full object-cover" />
                            </Link>
                        </div>
                        <div className="w-[50%] flex-none px-[57px] mx-5 hidden md:flex justify-center items-center">
                            <SearchBar />
                        </div>
                        <div className="w-max md:flex-1 flex justify-end">
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
                                <span className="ml-4 md:text-main">
                                    {deviceWidth >= 768 ? (
                                        <Icon.RiShoppingBasketFill size={38} />
                                    ) : (
                                        <div className="relative">
                                            <Icon.ImCart size={28} />
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
                <div className="w-full flex justify-center items-center border-t border-[#0000000d] px-5 md:px-0">
                    <div className={`${deviceWidth >= 768 ? 'w-main' : 'flex-1'}`}>
                        <Navigation />
                    </div>
                    {deviceWidth < 768 && <SearchBar />}
                </div>
            </div>
            {isShowing && (
                <Popup modalIsOpen={isShowing} closeModal={toggle}>
                    <div className="max-w-[700px] h-auto flex flex-col p-5 bg-white overflow-hidden relative">
                        <div className="w-10 h-10 absolute top-0 right-0">
                            <Button onClick={toggle} className="w-full h-full flex justify-center items-center">
                                <Icon.GrClose size={26} />
                            </Button>
                        </div>
                        {form === 0 ? (
                            <LoginForm onSetForm={setForm} />
                        ) : form === 1 ? (
                            <RegisterForm onSetForm={setForm} />
                        ) : (
                            <ForgotForm onSetForm={setForm} />
                        )}
                    </div>
                </Popup>
            )}
        </>
    )
}

export default Header
