import React from 'react'
import { Link } from 'react-router-dom'
import { footerMenu } from '../utils/menu'

const Footer = () => {
    return (
        <div className="w-full h-auto mt-5 flex flex-col justify-between items-center bg-[#333333] text-[#808080] ">
            <div className="flex-1 w-full flex justify-center items-center sm:py-[50px]">
                <div className="w-full xl:w-main h-auto flex flex-wrap md:flex-nowrap justify-between sm:gap-4 p-[10px]">
                    {footerMenu.map((el) => (
                        <div key={el.title} className="w-[50%] sm:w-1/4 mb-[10px]">
                            <h2 className="pl-[15px] mb-3 md:mb-5 text-[13px] md:text-[15px] text-white uppercase font-semibold border-l-4 border-main">
                                {el.title}
                            </h2>
                            <ul>
                                {el.items.map((item) => (
                                    <li key={item} className="mb-2">
                                        <Link to="/" className="text-sm hover:text-main">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-center items-center bg-[#282828] text-xs">
                <div className="w-main flex p-[10px]">
                    <span>&copy; 2023, Digital World Powered by Shopify </span>
                </div>
            </div>
        </div>
    )
}

export default Footer
