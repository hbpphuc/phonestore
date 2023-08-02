import React from 'react'
import Slider from 'react-slick'
import Blog from 'components/blog/Blog'

const Section3 = () => {
    const settingsBlogs = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    }

    return (
        <div className="w-main h-auto">
            <Slider {...settingsBlogs}>
                {[1, 2, 3, 4].map((item, index) => (
                    <Blog key={index} data={item} />
                ))}
            </Slider>
        </div>
    )
}

export default Section3
