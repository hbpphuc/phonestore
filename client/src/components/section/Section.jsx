import React, { memo, useEffect, useState } from 'react'
import Slider from 'react-slick'
import Skeleton from 'react-loading-skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'
import * as apis from 'apis'
import ProductItem from 'components/product/ProductItem'

const Section = ({ cateData, title }) => {
    const [cateId, setCateId] = useState('648d84dbc23688213c792cac')
    const [cateType, setCateType] = useState(null)
    const [prodCate, setProdCate] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { deviceWidth } = useSelector((state) => state.app)

    useEffect(() => {
        const getCategory = async () => {
            setIsLoading(true)
            const res = await apis.getCategory(cateId)
            setIsLoading(false)

            if (res?.status === 'success') {
                setProdCate(res?.data?.data?.products)
                setCateType(res?.data?.data?.slug)
            }
        }
        getCategory()
    }, [cateId])

    const settingsProducts = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: deviceWidth >= 1400 ? true : false,
    }

    let countToShow

    if (deviceWidth < 768) countToShow = 2
    else if (deviceWidth >= 768 && deviceWidth < 992) countToShow = 3
    else if (deviceWidth >= 1024) countToShow = 4

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center mb-[50px]">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            {cateData && (
                <ul className="w-full mb-[30px] flex flex-row-reverse justify-center items-center">
                    {cateData?.data?.map((item) => (
                        <li
                            key={item.slug}
                            className={`mx-[15px] text-[#8b8b8b] text-sm uppercase cursor-pointer hover:text-main transition-colors ${
                                cateId === item._id && 'text-main'
                            }`}
                            onClick={() => setCateId(item._id)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}

            <div className="w-full h-auto">
                {isLoading ? (
                    <Skeleton />
                ) : prodCate?.length > 0 ? (
                    deviceWidth >= 1400 ? (
                        <Slider {...settingsProducts}>
                            {prodCate?.slice(0, 6)?.map((item) => (
                                <ProductItem key={item._id} data={item} cateType={cateType} />
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
                            {prodCate?.slice(0, 6)?.map((item) => (
                                <SwiperSlide>
                                    <ProductItem key={item._id} data={item} cateType={cateType} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )
                ) : (
                    <div className="w-full flex justify-center items-cente text-[#8b8b8b] text-xl">No products</div>
                )}
            </div>
        </div>
    )
}

export default memo(Section)
