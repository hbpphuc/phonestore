import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { toast } from 'react-toastify'

import { setProductInCart } from '../../redux/order/orderSlice'
import * as apis from '../../apis'
import { publicRoutes } from '../../routes/paths'
import { Button } from '../../components'

const InfoProduct = ({ data, detail, isLoading }) => {
    const { productInCart } = useSelector((state) => state.order)
    const { deviceWidth } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(null)

    const IsLink = detail ? 'p' : Link

    const colors = [
        { value: 'red', label: 'Red' },
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
    ]

    const onSubmit = async () => {
        const res = await apis.addToCart({ quantity, product: data?._id, color: color?.label })
        if (res?.status === 'success') {
            dispatch(setProductInCart(productInCart + quantity))
            toast.success('Done!')
        } else toast.error(res?.message)
    }

    return (
        <div
            className={`w-full h-auto flex ${
                detail
                    ? 'w-full flex-col sm:flex-row sm:gap-5 sm:mt-3'
                    : 'sm:w-[500px] md:w-[700px] lg:w-[900px] flex-col items-center md:items-start md:flex-row lg:flex-row md:gap-5'
            } gap-1 overflow-y-auto`}
        >
            <div className="flex-1 h-full flex flex-col items-center">
                {deviceWidth < 640 && (
                    <div className="w-full md:mb-5 mt-3 mb-2">
                        {isLoading ? (
                            <Skeleton width="70%" />
                        ) : (
                            <IsLink
                                to={`${publicRoutes.products}/${data?.category?.slug}/${data?.slug}`}
                                className={`text-[#1c1c1c] text-lg font-semibold ${
                                    detail ? '' : 'hover:text-main'
                                } transition-colors`}
                            >
                                {data?.name}
                            </IsLink>
                        )}
                    </div>
                )}
                <div className={`w-full mb-3 ${detail && deviceWidth < 640 ? 'h-[300px]' : 'h-auto'}`}>
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
                {/* {data?.images.length > 0 && (
                    <div className={`w-full h-full ${detail ? 'border-t pt-2' : ''}`}>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={10}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[FreeMode]}
                            className="sm:!w-[280px] lg:!w-[500px] !h-auto"
                        >
                            {data?.images?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={item ?? 'https://app.advaiet.com/item_dfile/default_product.png'}
                                        alt={'item'}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )} */}
            </div>
            <div className="flex-1 h-full flex flex-col">
                {deviceWidth >= 640 && (
                    <div className="w-full md:mb-5 ">
                        {isLoading ? (
                            <Skeleton width="70%" />
                        ) : (
                            <IsLink
                                to={`${publicRoutes.products}/${data?.category?.slug}/${data?.slug}`}
                                className={`text-[#1c1c1c] text-lg font-semibold ${
                                    detail ? '' : 'hover:text-main'
                                } transition-colors`}
                            >
                                {data?.name}
                            </IsLink>
                        )}
                    </div>
                )}
                {(deviceWidth > 768 || detail) && (
                    <div>
                        {isLoading ? (
                            <Skeleton count={10} width="70%" />
                        ) : (
                            <ul
                                className={`w-max ml-4 mb-[15px] list-disc text-sm sm:text-base ${
                                    detail ? 'pl-2' : ''
                                }`}
                            >
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
                    </div>
                )}

                <h2 className="w-full mb-[15px] text-lg font-semibold text-main">
                    {isLoading ? <Skeleton width={100} /> : `$${data?.price} USD`}
                </h2>
                <form className="w-full flex flex-col items-center">
                    <div className="w-full mb-[15px] flex flex-col items-center md:items-start">
                        <div className="w-full mb-[15px] flex items-center">
                            <h2 className="min-w-[80px] mr-[10px] text-sm font-medium text-[#151515]">Color</h2>
                            <Select
                                id="color"
                                onChange={setColor}
                                options={colors}
                                placeholder="Color"
                                isSearchable={false}
                                className="w-[140px] md:w-[200px] font-medium text-sm text-primary"
                            />
                        </div>
                        <div className="w-full mb-[15px] flex items-center">
                            <h2 className="min-w-[80px] mr-[10px] text-sm font-medium text-[#151515]">Quantity</h2>
                            <div className="w-full flex">
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setQuantity((prev) => prev - 1)
                                    }}
                                    disable={quantity === 1 && true}
                                    className="w-8 h-8 flex justify-center items-center text-xl font-normal text-white bg-main disabled:bg-[#ccc]"
                                >
                                    -
                                </Button>
                                <div className="w-12 h-8">
                                    <input
                                        value={quantity}
                                        readOnly
                                        className="w-full h-8 md:text-lg text-center border-l border-r flex justify-center items-center outline-none"
                                    />
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setQuantity((prev) => prev + 1)
                                    }}
                                    disable={quantity >= data?.quantity && true}
                                    className="w-8 h-8 flex justify-center items-center text-xl font-normal text-white bg-main disabled:bg-[#ccc]"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault()
                                onSubmit()
                            }}
                            disabled={quantity < 1 && true}
                            className={`${
                                detail ? 'w-full mt-6' : 'w-[180px]'
                            } h-10 p-[8px_12px] flex justify-center items-center text-base text-white bg-main hover:bg-[#333] transition-colors disabled:bg-[#ccc]`}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(InfoProduct)
