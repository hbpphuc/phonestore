import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { Icon } from '../components'

const Header = () => {
    const user = 'Phuc'
    return (
        <div className="w-full h-[200px] flex flex-col">
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
                        <Link to="/" className="text-sm font-normal px-[10px] text-[#848484]">
                            Wish list
                        </Link>
                        <Link to="/" className="text-sm font-normal px-[10px] text-[#848484]">
                            Current
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
                    <div className="w-[50%] px-5">SEARCH</div>
                    <div className="flex-1 flex justify-end">
                        <Link className="flex justify-center items-center">
                            <div className="flex flex-col justify-center items-end">
                                <span>Your Cart</span>
                                <span className="font-bold">0 ITEM</span>
                            </div>
                            <span className="ml-4 text-primary">
                                <Icon.RiShoppingBasketFill size={38} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div>NAVIFATION</div>
        </div>
    )
}

export default Header
