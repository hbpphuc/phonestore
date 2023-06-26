import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { Icon, Navigation } from '../components'

const Header = () => {
    const user = 'Phuc'
    return (
        <div className="w-full h-auto flex flex-col">
            <div className="w-full flex justify-center items-center border-b border-[#0000000d] py-[10px]">
                <div className="w-main flex justify-between ">
                    <div className="flex">
                        {user && <p className="text-sm font-normal text-[#848484] mr-1">Hello {user},</p>}
                        <p className="text-sm font-normal text-[#848484]">Welcome to our Store!</p>
                    </div>
                    <div className="flex">
                        <Link to="/" className="text-sm font-normal px-[10px] text-[#848484]">
                            My Account
                        </Link>
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
                                name=""
                                id=""
                                placeholder="Search something"
                                className="flex-1 max-w-[80%] h-[42px] text-sm font-light p-[8px_10px] border-2 border-main outline-[#101010]"
                            />
                            <button
                                type="submit"
                                className="w-[42px] h-[42px] flex justify-center items-center text-white bg-main"
                            >
                                <Icon.TbSearch size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <Link className="flex justify-center items-center">
                            <div className="flex flex-col justify-center items-end">
                                <span>Your Cart</span>
                                <span className="font-bold">0 ITEM</span>
                            </div>
                            <span className="ml-4 text-main">
                                <Icon.RiShoppingBasketFill size={38} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center border-t border-[#0000000d]">
                <Navigation />
            </div>
        </div>
    )
}

export default Header
