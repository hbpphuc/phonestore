import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ data }) => {
    return (
        <div className="w-1/3 h-[400px] flex flex-col items-center">
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
                <span>June 26, 2023</span>
                <span>{data} comment</span>
            </div>
            <p className="text-center text-[13px] text-primary leading-[24px]">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi...
            </p>
        </div>
    )
}

export default Blog
