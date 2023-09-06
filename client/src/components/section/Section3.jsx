import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { PostItem } from 'components'
import * as apis from 'apis'

const Section3 = ({ title }) => {
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apis.getAllPost()
            setPost(res?.data?.data)
        }

        fetchApi()
    }, [])

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
                {post?.slice(0, 7).map((item) => (
                    <PostItem key={item._id} data={item} />
                ))}
            </Slider>
        </div>
    )
}

export default Section3
