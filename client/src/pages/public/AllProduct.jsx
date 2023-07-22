import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Select from 'react-select'
import * as apis from 'apis'
import { Breadcrumb, ProductItem, Navbar, Button } from 'components'
import { optSort, optColor } from 'utils/constant'
import ReactPaginate from 'react-paginate'

const LIMIT = 3

const AllProduct = () => {
    const { type } = useParams()

    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [brandOpt, setBrandOpt] = useState(null)

    const [brandS, setBrandS] = useState(null)
    const [sortS, setSortS] = useState(null)
    const [colorS, setColorS] = useState(null)

    const [valueBrand] = useDebounce(brandS, 1000)
    const [valueColor] = useDebounce(colorS, 1000)

    // const handleSeeMoreAccount = () => {
    //     setPage((prev) => prev + 1)
    // }

    useEffect(() => {
        const fetchApi = async () => {
            const resProd = await apis.getAllProduct({
                sort: sortS?.query,
                color: valueColor?.map((item) => item.value),
                brand: valueBrand?.map((item) => item.id),
                page,
                limit: LIMIT,
            })
            const resCate = await apis.getAllCategory()

            const prodList = resProd?.data?.data

            if (type) {
                const cateItem = resCate?.data?.data.find((item) => item.slug === type)
                const brandObj = cateItem?.brands.map((el) => ({ value: el.slug, label: el.name, id: el._id }))
                setProducts(prodList?.filter((item) => item.category === cateItem._id))
                setBrandOpt(brandObj)
            } else {
                setProducts(prodList)
            }
        }

        fetchApi()
    }, [type, sortS, valueBrand, valueColor, page])

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
                    <div className="w-3/4 h-auto flex flex-col">
                        {type && products?.length > 0 && (
                            <div className="w-full h-auto p-[0_8px] mb-2">
                                <div className="w-full h-auto flex justify-between p-2 border">
                                    <div className="w-[80%] h-full flex flex-col">
                                        <h2 className="text-base font-semibold text-primary mb-2">Filter by</h2>
                                        <div className="w-full h-auto flex flex-wrap gap-2">
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
                        )}
                        <div className="w-full h-full flex flex-wrap">
                            {products?.map((item, index) => (
                                <div key={index} className="w-1/3 h-auto mb-3">
                                    <ProductItem data={item} />
                                </div>
                            ))}
                        </div>
                        <ReactPaginate
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(products?.length / LIMIT) + 1}
                            breakLabel="..."
                            previousLabel="PREV"
                            nextLabel="NEXT"
                            className="w-full flex justify-center items-center gap-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProduct
