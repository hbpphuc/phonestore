import React, { memo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { routes } from '../routes/paths'

const InfoProduct = ({ data, detail }) => {
    const quantityRef = useRef()
    const internalRef = useRef()
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState(null)

    const props = { width: 400, height: 250, zoomWidth: 500, img: data?.imageCover }

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

    const settingImages = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    }

    return (
        <div className="w-full h-full flex gap-5">
            <div className="flex-1 h-full flex flex-col justify-around items-center">
                <div className={`${detail ? 'w-full border p-5' : 'w-[70%]'} max-h-[80%]`}>
                    <img
                        src={data?.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'}
                        alt={data?.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div
                    className={`w-full max-h-[20%] flex justify-between items-center ${
                        detail ? 'border' : ''
                    } overflow-x-auto`}
                >
                    {[1, 2, 3, 4].map((item, index) => (
                        <img
                            key={index}
                            src={'https://app.advaiet.com/item_dfile/default_product.png'}
                            alt={'item'}
                            className="w-full h-full object-contain"
                        />
                    ))}
                </div>
            </div>
            <div className="flex-1 h-full">
                <div className="w-full mb-5 ">
                    <IsLink
                        to={`${routes.product}/${data?.category?.slug}/${data?.slug}`}
                        className={`text-[#1c1c1c] text-xl font-semibold ${
                            detail ? '' : 'hover:text-main'
                        } transition-colors`}
                    >
                        {data?.name}
                    </IsLink>
                </div>
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
                <h2 className="w-full mb-[15px] text-xl font-semibold text-main">${data?.price} USD</h2>
                <div className="w-full mb-[15px]">
                    <div className="w-full mb-[15px] flex items-center">
                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Internal</h2>
                        <Select value={selectedOption} options={internal} className="w-[200px]" />
                    </div>
                    <div className="w-full mb-[15px] flex items-center">
                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">Color</h2>
                        <Select value={selectedOption} options={colors} className="w-[200px]" />
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
