import React from 'react'
import Slider from 'react-slick'
import Blog from 'components/blog/Blog'

const Section3 = ({ title }) => {
    const settingsBlogs = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    }

    return (
        <div className="w-main h-auto">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            <Slider {...settingsBlogs}>
                {[1, 2, 3, 4].map((item, index) => (
                    <Blog key={index} data={item} />
                ))}
            </Slider>
        </div>
    )
}

export default Section3
