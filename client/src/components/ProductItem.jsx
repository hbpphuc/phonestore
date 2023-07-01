/* eslint-disable react/style-prop-object */
import React, { memo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Select from 'react-select'
import useModal from '../hooks/useModal'
import Popup from './Popup'
import { productAction } from '../utils/menu'
import Icon from './Icons'

const ProductItem = ({ data }) => {
    const { isShowing, toggle } = useModal()
    const quantityRef = useRef()

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

    const [selectedOption, setSelectedOption] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [prodId, setProdId] = useState(null)

    const isNew = true

    const handleClickActionBtn = (item) => {
        if (item.id === 3) {
            toggle()
        }
    }

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className="w-full h-auto mx-2 flex flex-col items-center product-item border">
                    <div className="w-full h-[300px] mb-5 p-[15px] overflow-hidden relative flex flex-col items-center">
                        <div
                            className={`product-item-favourite ${
                                isNew ? 'bg-[#00d5d5] border-t-[#00d5d5]' : 'bg-[#ffb400] border-t-[#ffb400]'
                            }`}
                        >
                            <span className="absolute rounded-full left-1 top-[50%] translate-y-[-50%] w-[6px] h-[6px] bg-[white]"></span>
                            <span>New</span>
                        </div>
                        <div className="w-full h-full flex justify-center items-start">
                            <Link to="/">
                                <img
                                    src={data.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'}
                                    alt={data.name}
                                    className="w-full h-full object-center"
                                />
                            </Link>
                        </div>
                        <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative -bottom-16">
                            {productAction.map((item) => (
                                <Tippy key={item.id} content={item.title} placement="top">
                                    <button
                                        onClick={() => handleClickActionBtn(item)}
                                        className="w-11 h-11 flex justify-center items-center rounded-full product-action"
                                    >
                                        {item.icon}
                                    </button>
                                </Tippy>
                            ))}
                        </div>
                    </div>
                    <Link to="/" className="mb-[6px] hover:text-main transition-colors line-clamp-1">
                        {data.name}
                    </Link>
                    <div className="flex mb-[10px] gap-4">
                        {false && <h2 className="text-base text-[#999] line-through">${data.price} USD</h2>}
                        <h2 className="text-base text-main">${data.price} USD</h2>
                    </div>
                </div>
            </div>
            {isShowing && (
                <Popup modalIsOpen={isShowing} closeModal={toggle}>
                    <div className="max-w-[900px] h-[600px] flex flex-col p-5 bg-white overflow-hidden relative">
                        <div className="w-10 h-10 absolute top-0 right-0">
                            <button onClick={toggle} className="w-full h-full flex justify-center items-center">
                                <Icon.GrClose size={26} />
                            </button>
                        </div>
                        <div className="w-full h-full flex gap-5">
                            <div className="flex-1 h-full flex flex-col justify-between items-center ">
                                <div className="w-full h-full">
                                    <img
                                        src={
                                            data.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'
                                        }
                                        alt={data.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-full max-h-[100px] flex justify-between items-center">
                                    {[1, 2, 3, 4].map((item) => (
                                        <img
                                            src={'https://app.advaiet.com/item_dfile/default_product.png'}
                                            alt={'item'}
                                            className="w-full h-full object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 h-full">
                                <div className="w-full mb-5 ">
                                    <Link
                                        to="/"
                                        className="text-[#1c1c1c] text-xl font-semibold hover:text-main transition-colors"
                                    >
                                        {data.name}
                                    </Link>
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
                                <h2 className="w-full mb-[15px] text-xl font-semibold text-main">${data.price} USD</h2>
                                <div className="w-full mb-[15px]">
                                    <div className="w-full mb-[15px] flex items-center">
                                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">
                                            Quantity
                                        </h2>
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
                                    <div className="w-full mb-[15px] flex items-center">
                                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">
                                            Internal
                                        </h2>
                                        <Select value={selectedOption} options={internal} className="w-[200px]" />
                                    </div>
                                    <div className="w-full mb-[15px] flex items-center">
                                        <h2 className="min-w-[80px] mr-[10px] text-sm font-semibold text-[#151515]">
                                            Color
                                        </h2>
                                        <Select value={selectedOption} options={colors} className="w-[200px]" />
                                    </div>
                                    <button
                                        disabled={quantity < 1 && true}
                                        className="w-[140px] h-10 p-[11px_15px] flex justify-center items-center text-base text-white bg-main hover:bg-[#333] transition-colors disabled:bg-[#ccc]"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            )}
        </>
    )
}

export default memo(ProductItem)
