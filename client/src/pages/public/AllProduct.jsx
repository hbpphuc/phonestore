import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import { Breadcrumb, ProductItem, Sidebar } from '../../components'

const AllProduct = () => {
    const { type } = useParams()

    const [products, setProducts] = useState(null)

    useEffect(() => {
        const getAllProduct = async () => {
            const res = await apis.getAllProduct()
            const data = res?.data?.data
            type ? setProducts(data?.filter((item) => item.category.slug === type)) : setProducts(data)
        }

        getAllProduct()
    }, [type])

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto py-5 mb-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb />
                </div>
                <div className="w-main flex gap-5">
                    <div className="w-1/4 h-auto">
                        <Sidebar />
                    </div>
                    <div className="w-3/4 h-auto flex flex-col">
                        {type && products.length > 0 && (
                            <div className="w-full h-[100px] p-[0_8px] mb-2">
                                <div className="w-full h-full flex justify-between p-2 border">
                                    <div className="w-[70%] h-full">
                                        <h2 className="text-base font-semibold text-primary">Filter by</h2>
                                        <h2>ajdjaskldjals</h2>
                                    </div>
                                    <div className="w-[30%] h-full">
                                        <h2 className="text-base font-semibold text-primary">Sort by</h2>
                                        <h2>ajdjaskldjals</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="w-full h-full flex flex-wrap">
                            {products?.map((item, index) => (
                                <div key={index} className="w-1/3 h-auto mb-3">
                                    <ProductItem data={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProduct
