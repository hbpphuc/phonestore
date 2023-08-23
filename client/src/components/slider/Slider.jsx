import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Slider = () => {
    return (
        <div className="w-full h-[600px] mb-10">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
            >
                <SwiperSlide>
                    <img
                        src="https://cdn.shopify.com/s/files/1/1903/5289/files/home10-slideshow1-bkg_23bde2db-e1c9-4b58-be3b-a55e6b2249a0_1920x.jpg?v=1613172161"
                        alt="slider"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://digital-world-10.myshopify.com/cdn/shop/files/home10-slideshow2-bkg_1920x.jpg?v=1613172161"
                        alt="slider"
                        className="w-full h-full object-contain"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://digital-world-8.myshopify.com/cdn/shop/files/slideshow2-home8_7f33711c-5412-4c2e-a850-a0242743b27a_1920x.jpg?v=1613508420"
                        alt="slider"
                        className="w-full h-full object-contain"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://digital-world-8.myshopify.com/cdn/shop/files/slideshow-home4_1920x.jpg?v=1613508273"
                        alt="slider"
                        className="w-full h-full object-contain"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider
