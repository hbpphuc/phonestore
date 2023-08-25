import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { useDispatch, useSelector } from 'react-redux'
import { setProductInCart } from 'redux/order/orderSlice'
import Select from 'react-select'

import * as apis from 'apis'
import { publicRoutes } from 'routes/paths'
import { Button } from 'components'
import { toast } from 'react-toastify'

const InfoProduct = ({ data, detail, isLoading }) => {
    const { productInCart } = useSelector((state) => state.order)
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(null)

    const IsLink = detail ? 'p' : Link

    const colors = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'black', label: 'Black' },
    ]

    const onSubmit = async () => {
        const res = await apis.addToCart({ quantity, product: data?._id, color: color?.label })
        if (res?.status === 'success') {
            dispatch(setProductInCart(productInCart + quantity))
            toast.success('Done!')
        } else toast.error(res?.message)
    }

    return (
        <div className={`w-full h-full flex gap-5`}>
            <div className="flex-1 h-full flex flex-col items-center">
                <div className={`w-full mb-3 h-auto`}>
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
                    <div className={`w-full h-full ${detail ? 'border-t pt-2' : ''}`}>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={30}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[FreeMode]}
                            className="!w-[500px] !h-auto"
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
                )}
            </div>
            <div className="flex-1 h-full flex flex-col">
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
                <form className="w-full flex flex-col items-center">
                    <div className="w-full mb-[15px]">
                        <div className="w-full mb-[15px] flex items-center">
                            <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Color</h2>
                            <Select
                                id="color"
                                onChange={setColor}
                                options={colors}
                                placeholder="Choose color"
                                isSearchable={false}
                                className="w-[200px] font-semibold text-sm text-primary"
                            />
                        </div>
                        <div className="w-full mb-[15px] flex items-center">
                            <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Quantity</h2>
                            <div className="w-full flex">
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setQuantity((prev) => prev - 1)
                                    }}
                                    disabled={quantity === 1 && true}
                                    className="w-9 h-9 flex justify-center items-center text-2xl font-normal text-white bg-main disabled:bg-[#ccc]"
                                >
                                    -
                                </Button>
                                <div className="w-12 h-9">
                                    <input
                                        value={quantity}
                                        readOnly
                                        className="w-full h-9 text-xl text-center border-l border-r flex justify-center items-center outline-none"
                                    />
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setQuantity((prev) => prev + 1)
                                    }}
                                    className="w-9 h-9 flex justify-center items-center text-2xl font-normal text-white bg-main"
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
                                detail ? 'w-full mt-10' : 'w-[140px]'
                            } h-10 p-[11px_15px] flex justify-center items-center text-base text-white bg-main hover:bg-[#333] transition-colors disabled:bg-[#ccc]`}
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
