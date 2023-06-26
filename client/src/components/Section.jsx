import React from 'react'
import Blog from './Blog'
import Product from './Product'

const Section = ({ data, type, title }) => {
    return (
        <div className="w-main h-auto flex flex-col justify-center items-center mb-10">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            <div className="w-full h-auto flex gap-5">
                {type === 'product'
                    ? data.map((item) => <Product data={item} />)
                    : data.slice(0, 3).map((item) => <Blog data={item} />)}
            </div>
        </div>
    )
}

export default Section
