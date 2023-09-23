import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PostItem } from 'components'
import * as apis from 'apis'

const Section3 = ({ title }) => {
    const [post, setPost] = useState(null)
    const { deviceWidth } = useSelector((state) => state.app)

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
        arrows: deviceWidth >= 1400 ? true : false,
    }

    let countToShow

    if (deviceWidth < 992) countToShow = 2
    else if (deviceWidth >= 992) countToShow = 3

    return (
        <div className="w-full h-auto">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            {deviceWidth >= 1400 ? (
                <Slider {...settingsBlogs}>
                    {post?.slice(0, 7).map((item) => (
                        <PostItem key={item._id} data={item} />
                    ))}
                </Slider>
            ) : (
                <Swiper
                    slidesPerView={countToShow}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    className="flex"
                >
                    {post?.slice(0, 7).map((item) => (
                        <SwiperSlide>
                            <PostItem key={item._id} data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default Section3
