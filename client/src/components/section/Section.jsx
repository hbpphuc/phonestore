import React, { memo, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { useSelector } from 'react-redux'
import * as apis from 'apis'
import ProductItem from 'components/product/ProductItem'

const Section = ({ pData, cateData, title, detail }) => {
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

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center mb-5 md:mb-[50px]">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            {!detail && cateData && (
                <ul className="w-full mb-[30px] flex flex-row flex-wrap gap-[15px] justify-center items-center px-[10px] sm:px-0">
                    {cateData?.data?.map((item, index) => (
                        <li
                            key={index}
                            className={`text-[#8b8b8b] text-sm uppercase cursor-pointer hover:text-main transition-colors ${
                                cateId === item._id && 'text-main'
                            }`}
                            onClick={() => setCateId(item._id)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}

            <div className="w-full h-auto relative overflow-hidden">
                {isLoading ? (
                    <Skeleton />
                ) : prodCate?.length > 0 ? (
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={0}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 0,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 0,
                            },
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {pData
                            ? pData?.slice(0, 6)?.map((item, index) => (
                                  <SwiperSlide key={index}>
                                      <ProductItem data={item} cateType={cateType} />
                                  </SwiperSlide>
                              ))
                            : prodCate?.slice(0, 6)?.map((item, index) => (
                                  <SwiperSlide key={index}>
                                      <ProductItem data={item} cateType={cateType} />
                                  </SwiperSlide>
                              ))}
                    </Swiper>
                ) : (
                    <div className="w-full flex justify-center items-cente text-[#8b8b8b] text-xl">No products</div>
                )}
            </div>
        </div>
    )
}

export default memo(Section)
