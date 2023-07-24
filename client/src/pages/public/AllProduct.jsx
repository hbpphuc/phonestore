import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Select from 'react-select'
import * as apis from 'apis'
import { Breadcrumb, ProductItem, Navbar, Paginate } from 'components'
import { optSort, optColor } from 'utils/constant'

const LIMIT = 4

const AllProduct = () => {
    const { type } = useParams()

    const [page, setPage] = useState(1)
    const [prodCount, setProdCount] = useState(0)
    const [products, setProducts] = useState([])
    const [brandOpt, setBrandOpt] = useState(null)

    const [brandS, setBrandS] = useState(null)
    const [sortS, setSortS] = useState(null)
    const [colorS, setColorS] = useState(null)

    const [valueBrand] = useDebounce(brandS, 1000)
    const [valueColor] = useDebounce(colorS, 1000)

    useEffect(() => {
        const fetchApi = async () => {
            const resProd = await apis.getAllProduct()
            // const resProdQuery = await apis.getAllProductWithQuery({
            //     sort: sortS?.query,
            //     color: valueColor?.map((item) => item.value),
            //     brand: valueBrand?.map((item) => item.id),
            //     page,
            //     limit: LIMIT,
            // })
            const resCate = await apis.getAllCategory()

            const prodList = resProd?.data?.data
            const cateList = resCate?.data?.data

            if (type) {
                const cateItem = cateList.find((item) => item.slug === type)
                const brandObj = cateItem?.brands.map((item) => ({ value: item.slug, label: item.name, id: item._id }))
                const prodCate = prodList?.filter((item) => item.category === cateItem._id)
                setProducts(prodCate)
                setBrandOpt(brandObj)
                setProdCount(prodCate.length)
            } else {
                setProducts(prodList)
                setProdCount(prodList.length)
            }
        }

        fetchApi()
    }, [type, sortS, valueBrand, valueColor, page, prodCount])

    // useEffect(() => {
    //     const getProductCount = async () => {
    //         const resProd = await apis.getAllProduct()

    //         if (type) {
    //             setProdCount(products.length)
    //         } else {
    //             setProdCount(resProd?.data?.data.length)
    //         }
    //     }

    //     getProductCount()
    // }, [type])

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto py-5 mb-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb />
                </div>
                <div className="w-main flex gap-5">
                    <div className="w-1/4 h-auto">
                        <Navbar />
                    </div>
                    <div className="w-3/4 h-auto flex flex-col ">
                        <div className="w-full h-auto p-[0_8px] mb-2">
                            <div
                                className={`w-full h-auto flex ${type ? 'justify-between' : 'justify-end'} p-2 border`}
                            >
                                <div className="w-[80%] h-full flex flex-col">
                                    <h2 className="text-base font-semibold text-primary mb-2">Filter by</h2>
                                    <div className="w-full h-auto flex flex-wrap gap-2">
                                        {type && products?.length > 0 && (
                                            <div className="w-auto h-auto ">
                                                <Select
                                                    defaultValue="No Brand"
                                                    onChange={setBrandS}
                                                    options={brandOpt}
                                                    placeholder="Brand"
                                                    isSearchable={false}
                                                    isMulti={true}
                                                />
                                            </div>
                                        )}
                                        <div className="w-auto h-auto">
                                            <Select
                                                defaultValue="No Color"
                                                onChange={setColorS}
                                                options={optColor}
                                                placeholder="Color"
                                                isSearchable={false}
                                                isMulti={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[20%] h-full">
                                    <h2 className="text-base font-semibold text-primary mb-2">Sort by</h2>
                                    <Select
                                        onChange={setSortS}
                                        options={optSort}
                                        placeholder="Sort"
                                        isSearchable={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-wrap">
                            {products?.map((item, index) => (
                                <div key={index} className="w-1/3 h-auto mb-3">
                                    <ProductItem data={item} />
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-auto mt-5 flex justify-center items-end">
                            {prodCount > LIMIT && (
                                <Paginate itemCount={prodCount} itemsPerPage={LIMIT} onSetPage={setPage} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProduct
