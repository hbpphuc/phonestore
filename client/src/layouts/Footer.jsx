import React from 'react'
import { Link } from 'react-router-dom'
import { footerMenu } from '../utils/menu'

const Footer = () => {
    return (
        <div className="w-full h-[400px] mt-5 flex flex-col justify-between items-center bg-[#333333] text-[#808080]">
            <div className="flex-1 w-full flex justify-center items-center py-[50px]">
                <div className="w-main h-auto flex gap-4">
                    {footerMenu.map((el) => (
                        <div key={el.title} className="w-1/4">
                            <h2 className="pl-[15px] mb-5 text-[15px] text-white uppercase font-semibold border-l-4 border-main">
                                {el.title}
                            </h2>
                            <ul>
                                {el.items.map((item) => (
                                    <li key={item} className="mb-[10px]">
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
            <div className="w-full flex justify-center items-center bg-[#282828] text-xs py-5">
                <div className="w-main flex">
                    <span>&copy; 2023, Digital World Powered by Shopify </span>
                </div>
            </div>
        </div>
    )
}

export default Footer
