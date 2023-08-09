import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import Select from 'react-select'
import * as apis from 'apis'
import { Breadcrumb, ProductItem, Navbar, Paginate } from 'components'
import { optSort, optColor } from 'utils/constant'
import { useSelector } from 'react-redux'
import useNavigateSearch from 'hooks/useNavigateSearch'
import { HiSelector } from 'react-icons/hi'

const LIMIT = 4

const AllProduct = () => {
    const { type } = useParams()
    const navigateSearch = useNavigateSearch()

    const { categories } = useSelector((state) => state.app)

    const [totalProds, setTotalProds] = useState(0)
    const [allProds, setAllProds] = useState(null)
    const [prods, setProds] = useState(null)
    const [page, setPage] = useState(1)

    const [brandOpt, setBrandOpt] = useState(null)
    const [brandS, setBrandS] = useState(null)
    const [sortS, setSortS] = useState(null)
    const [colorS, setColorS] = useState(null)

    const [valueBrand] = useDebounce(brandS, 1000)
    const [valueColor] = useDebounce(colorS, 1000)

    useEffect(() => {
        const getAllProd = async () => {
            const resProd = await apis.getAllProduct()
            // console.log(resProd)
            if (resProd?.status === 'success') {
                setAllProds(resProd?.data?.data)
                setTotalProds(resProd?.results)
            }
        }
        getAllProd()
    }, [type])

    const getParams = () => {
        const q = {
            sort: sortS?.query,
            color: valueColor?.map((item) => item.value),
            brand: valueBrand?.map((item) => item.value),
            page,
            limit: LIMIT,
        }
        for (let i in q)
            if (q[i] === undefined || q[i].length < 1) {
                delete q[i]
            }
        navigateSearch('', q)
    }

    useEffect(() => {
        if (sortS || valueBrand || valueColor || page) getParams()

        const fetchApi = async () => {
            const resFilter = await apis.getAllProductWithQuery({
                sort: sortS?.query,
                color: valueColor?.map((item) => item.value),
                brand: valueBrand?.map((item) => item.id),
                page: page || 1,
                limit: LIMIT,
            })
            const prodFilter = resFilter?.data?.data

            prodFilter.length < 1 && setPage(1)

            if (type) {
                const cateItem = categories?.data?.find((item) => item.slug === type)
                const prodCate = prodFilter?.filter((item) => item.category === cateItem?._id)
                setProds(prodCate)
                const brandObj = cateItem?.brands.map((item) => ({ value: item.slug, label: item.name, id: item._id }))
                setBrandOpt(brandObj)
                setTotalProds(prodCate?.length)
            } else {
                setProds(prodFilter)
                setTotalProds(allProds?.length)
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
                    <div className="w-3/4 h-auto flex flex-col ">
                        <div className="w-full h-auto p-[0_8px] mb-2">
                            <div
                                className={`w-full h-auto flex ${type ? 'justify-between' : 'justify-end'} p-2 border`}
                            >
                                <div className="w-[80%] h-full flex flex-col">
                                    <h2 className="text-base font-semibold text-primary mb-2">Filter by</h2>
                                    <div className="w-full h-auto flex flex-wrap gap-2">
                                        {type && prods?.length > 0 && (
                                            <div className="w-auto h-auto ">
                                                <HiSelector
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
                            {prods?.map((item) => (
                                <div key={item.id} className="w-1/3 h-auto mb-3">
                                    <ProductItem data={item} cateType={type} />
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-auto mt-5 flex justify-center items-end">
                            <Paginate itemCount={totalProds} itemsPerPage={LIMIT} onSetPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProduct
