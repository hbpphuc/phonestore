import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { useDispatch, useSelector } from 'react-redux'
import { Popup, LoginForm, RegisterForm, ForgotForm, Button, Icon, Navigation } from '../components'
import useModal from '../hooks/useModal'
import { adminRoutes, privateRoutes } from 'routes/paths'
import logo from '../assets/images/logo.png'
import { getCurrentUser } from '../redux/user/userAction'
import * as apis from '../apis'
import { logoutt } from '../redux/user/userSlice'
import Swal from 'sweetalert2'

const Header = ({ onSetOpenOrder, cartItemCount }) => {
    const { isShowing, toggle } = useModal()
    const [form, setForm] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn, curUser } = useSelector((state) => state.user)

    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrentUser())
    }, [dispatch, isLoggedIn])

    const logout = async () => {
        const res = await apis.logout()
        if (res.status === 'success') {
            dispatch(logoutt({ isLoggedIn: false }))
            Swal.fire('Congratulation!', 'User logout successfully!', 'success').then(() => navigate(0))
        }
    }

    return (
        <>
            <div className="w-full h-auto flex flex-col">
                <div className="w-full flex justify-center items-center border-b border-[#0000000d] py-[10px]">
                    <div className="w-main flex justify-between ">
                        <div className="flex">
                            {curUser && (
                                <>
                                    <p className="flex gap-1 text-sm font-normal text-[#848484]">
                                        <span>Hello</span>
                                        <i className="text-main font-semibold">{curUser?.data?.name.split(' ')[0]}</i>
                                    </p>
                                    <p className="text-sm font-normal text-[#848484]">, welcome to our Store!</p>
                                </>
                            )}
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
                <div className="w-full flex justify-center items-center py-[30px]">
                    <div className="w-main flex items-center justify-between">
                        <div className="flex-1">
                            <Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        <div className="w-[50%] px-[57px] mx-5">
                            <div className="w-full flex justify-center items-center">
                                <input
                                    type="text"
                                    placeholder="Search something"
                                    className="flex-1 max-w-[80%] h-[42px] text-sm font-light p-[8px_10px] border-2 border-main outline-[#101010]"
                                />
                                <Button
                                    type="submit"
                                    className="w-[42px] h-[42px] flex justify-center items-center text-white bg-main hover:brightness-95 transition-all"
                                >
                                    <Icon.TbSearch size={24} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <Button onClick={() => onSetOpenOrder(true)} className="flex justify-center items-center">
                                <div className="flex flex-col justify-center items-end">
                                    <span>Your Cart</span>
                                    <span className="font-bold">{`${cartItemCount > 0 ? cartItemCount : 0} ITEM`}</span>
                                </div>
                                <span className="ml-4 text-main">
                                    <Icon.RiShoppingBasketFill size={38} />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center border-t border-[#0000000d]">
                    <Navigation />
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
