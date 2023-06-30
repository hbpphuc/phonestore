import React from 'react'
import { useSelector } from 'react-redux'

const Section2 = () => {
    const { categories } = useSelector((state) => state.app)

    return (
        <div className="w-main h-auto flex flex-col justify-center items-center mb-[50px]">
            <div className="w-full mb-5 flex justify-center items-center relative">
                <h2 className="pb-[15px] text-xl text-secondary uppercase font-normal">hot collections</h2>
                <span className="w-10 h-[3px] bg-[#ccc] absolute bottom-0"></span>
            </div>
            <div className="w-full h-auto flex flex-wrap justify-between items-center">
                {categories?.data.slice(0, 6).map((item) => (
                    <div
                        key={item._id}
                        className="w-[33%] h-[260px] mb-[6px] flex justify-center items-center gap-2 p-[15px] border border-[#ebebeb]"
                    >
                        <div className="flex-1 h-full">
                            <img
                                src={item.imageCover || 'https://app.advaiet.com/item_dfile/default_product.png'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 h-full flex flex-col">
                            <h2 className="w-full text-base text-primary mb-[10px] uppercase font-semibold">
                                {item.name}
                            </h2>
                            <ul className="flex flex-col gap-1">
                                {item?.brands.slice(0, 6).map((el) => (
                                    <li key={el._id} className="hover:text-main cursor-pointer transition-colors">
                                        {'> ' + el.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Section2
