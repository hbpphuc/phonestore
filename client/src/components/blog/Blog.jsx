import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from 'components/general/Icons'

const Blog = ({ data }) => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full mx-2 flex flex-col items-center">
                <img
                    src="https://cdn.shopify.com/s/files/1/1903/5289/articles/blog_05_23709271-7357-4e0e-8783-68569206faad.jpg?v=1617287151"
                    alt="blog"
                    className="w-full mb-5 object-cover"
                />
                <Link
                    to="/"
                    className="text-base text-secondary text-center font-semibold mb-[15px] uppercase hover:text-main transition-colors"
                >
                    THE STANDARD LOREM IPSUM PASSAGE, USED SINCE THE 1500S
                </Link>
                <div className="w-full justify-evenly flex mb-[10px] text-[13px] text-[#8b8b8b]">
                    <span className="flex justify-center gap-2">
                        <Icon.BsCalendar3 size={16} /> June 26, 2023
                    </span>
                    <span className="flex justify-center gap-2">
                        <Icon.FaRegComments size={16} /> {data} comment
                    </span>
                </div>
                <p className="text-center text-[13px] text-primary leading-[24px]">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi...
                </p>
            </div>
        </div>
    )
}

export default memo(Blog)
