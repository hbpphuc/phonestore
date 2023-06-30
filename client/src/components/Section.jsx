import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import { getCateId } from '../redux/appSlice'
import ProductItem from './ProductItem'
import Blog from './Blog'

const Section = ({ prodData, cateData, type, title }) => {
    const { cateId } = useSelector((state) => state.app)

    const dispatch = useDispatch()

    const settingsProducts = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    }

    const settingsBlogs = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    }

    return (
        <div className="w-main h-auto flex flex-col justify-center items-center mb-[50px]">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">{title}</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            {cateData && (
                <ul className="w-full mb-[30px] flex justify-center items-center">
                    {cateData?.data?.map((item) => (
                        <li
                            key={item.slug}
                            className={`mx-[15px] text-[#8b8b8b] text-base uppercase cursor-pointer hover:text-main transition-colors ${
                                cateId === item._id && 'text-main'
                            }`}
                            onClick={() => dispatch(getCateId(item._id))}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="w-full h-auto">
                {type === 'product' ? (
                    prodData?.length > 0 ? (
                        <Slider {...settingsProducts}>
                            {prodData?.map((item, index) => (
                                <ProductItem key={index} data={item} />
                            ))}
                        </Slider>
                    ) : (
                        <div className="w-full flex justify-center items-cente text-[#8b8b8b] text-xl">No products</div>
                    )
                ) : (
                    <Slider {...settingsBlogs}>
                        {[1, 2, 3, 4].map((item, index) => (
                            <Blog key={index} data={item} />
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    )
}

export default memo(Section)
