import React, { memo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Select from 'react-select'
import { publicRoutes } from 'routes/paths'

const InfoProduct = ({ data, detail, isLoading }) => {
    const quantityRef = useRef()
    const internalRef = useRef()
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState(null)

    const IsLink = detail ? 'p' : Link

    const internal = [
        { value: '32gb', label: '32GB' },
        { value: '64gb', label: '64GB' },
        { value: '128gb', label: '128GB' },
    ]

    const colors = [
        { value: 'red', label: 'RED' },
        { value: 'blue', label: 'BLUE' },
        { value: 'black', label: 'BLACK' },
    ]

    return (
        <div className="w-full h-full flex gap-5">
            <div className="flex-none w-1/2 h-full flex flex-col items-center">
                <div className={`${detail ? 'w-full mb-3' : 'w-[70%]'} max-h-[80%]`}>
                    {isLoading ? (
                        <Skeleton className="w-full h-[300px]" />
                    ) : (
                        <img
                            src={data?.imageCover ?? 'https://app.advaiet.com/item_dfile/default_product.png'}
                            alt={'imageCover'}
                            className="w-full h-full object-contain"
                        />
                    )}
                </div>
                {data?.images.length > 0 && (
                    <div className={`w-full max-h-[20%] ${detail ? 'border-t pt-2' : ''}`}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {data?.images.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={item ?? 'https://app.advaiet.com/item_dfile/default_product.png'}
                                        alt={'item'}
                                        className="w-full h-full object-contain"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
            <div className="flex-none w-1/2 h-full flex flex-col">
                <div className="w-full mb-5 ">
                    {isLoading ? (
                        <Skeleton width="70%" />
                    ) : (
                        <IsLink
                            to={`${publicRoutes.products}/${data?.category?.slug}/${data?.slug}`}
                            className={`text-[#1c1c1c] text-xl font-semibold ${
                                detail ? '' : 'hover:text-main'
                            } transition-colors`}
                        >
                            {data?.name}
                        </IsLink>
                    )}
                </div>
                {isLoading ? (
                    <Skeleton count={10} width="70%" />
                ) : (
                    <ul className="w-full ml-4 mb-[15px] list-disc">
                        <li>Technology: GSM / HSPA / LTE</li>
                        <li>Dimensions: 146 x 72 x 8.1 mm</li>
                        <li>Weight: 161 g</li>
                        <li>Display: IPS LCD 5.2 inches</li>
                        <li>Resolution: 1080 x 1920</li>
                        <li>OS: Android OS, v6.0.1 (Marshmallow)</li>
                        <li>Chipset: Snapdragon 820</li>
                        <li>CPU: Quad-core</li>
                        <li>Inter...</li>
                    </ul>
                )}

                <h2 className="w-full mb-[15px] text-xl font-semibold text-main">
                    {isLoading ? <Skeleton width={100} /> : `$${data?.price} USD`}
                </h2>
                <div className="w-full mb-[15px]">
                    <div className="w-full mb-[15px] flex items-center">
                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Internal</h2>
                        <Select
                            placeholder="Internal"
                            isSearchable={false}
                            value={selectedOption}
                            options={internal}
                            className="w-[200px]"
                        />
                    </div>
                    <div className="w-full mb-[15px] flex items-center">
                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Color</h2>
                        <Select
                            placeholder="Color"
                            isSearchable={false}
                            value={selectedOption}
                            options={colors}
                            className="w-[200px]"
                        />
                    </div>
                    <div className="w-full mb-[15px] flex items-center">
                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Quantity</h2>
                        <div className="w-full flex">
                            <button
                                onClick={() => {
                                    setQuantity((prev) => prev - 1)
                                }}
                                disabled={quantity === 1 && true}
                                className="w-9 h-9 flex justify-center items-center text-2xl font-normal text-white bg-main disabled:bg-[#ccc]"
                            >
                                -
                            </button>
                            <input
                                ref={quantityRef}
                                value={quantity}
                                readOnly
                                className="w-12 h-9 text-center border-l border-r flex justify-center items-center"
                            />
                            <button
                                onClick={() => {
                                    setQuantity((prev) => prev + 1)
                                }}
                                className="w-9 h-9 flex justify-center items-center text-2xl font-normal text-white bg-main"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        disabled={quantity < 1 && true}
                        className={`${
                            detail ? 'w-full mt-10' : 'w-[140px]'
                        } h-10 p-[11px_15px] flex justify-center items-center text-base text-white bg-main hover:bg-[#333] transition-colors disabled:bg-[#ccc]`}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(InfoProduct)
