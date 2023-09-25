import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
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

    return (
        <div className="w-full h-auto">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="flex"
            >
                {post?.slice(0, 7).map((item, index) => (
                    <SwiperSlide>
                        <PostItem key={index} data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Section3
