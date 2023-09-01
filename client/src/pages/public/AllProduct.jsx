import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import LoadingBar from 'react-top-loading-bar'
import Select from 'react-select'
import * as apis from 'apis'
import { Breadcrumb, ProductItem, Navbar, Paginate } from 'components'
import { optSort, optColor } from 'utils/constant'
import { toast } from 'react-toastify'

const limit = 6

const AllProduct = () => {
    const { type } = useParams()
    const { search } = useLocation()

    const [prods, setProds] = useState(null)
    const [cId, setCId] = useState(null)
    const [totalProds, setTotalProds] = useState(0)
    const [page, setPage] = useState(1)

    const [progress, setProgress] = useState(0)

    const [brandOpt, setBrandOpt] = useState(null)
    const [brandS, setBrandS] = useState(null)
    const [sortS, setSortS] = useState(null)
    const [colorS, setColorS] = useState(null)

    const [valueBrand] = useDebounce(brandS, 1000)
    const [valueColor] = useDebounce(colorS, 1000)

    useEffect(() => {
        const params = {
            page,
            limit,
            sort: sortS?.query,
            color: valueColor?.map((item) => item.value),
            brand: valueBrand?.map((item) => item.id),
            category: cId || undefined,
            name: search.split('=')[1] || undefined,
        }

        const fetchApi = async () => {
            setProgress(40)
            const res = await apis.getAllProduct(params)
            setProgress(100)

            if (res?.results === 0) toast.error('No product found!')
            setTotalProds(res?.pagination?.total)

            if (!type) {
                setCId(undefined)
                setProds(res?.data?.data)
            } else {
                const prodType = res?.data?.data?.filter((item) => item.category.slug === type)
                setCId(prodType[0]?.category?.id)
                setProds(prodType)
                setBrandOpt(
                    prodType[0]?.category?.brands.map((item) => ({
                        value: item.slug,
                        label: item.name,
                        id: item._id,
                    }))
                )
            }
        }

        fetchApi()
    }, [type, sortS, valueBrand, valueColor, page, limit, cId, search])

    return (
        <div className="w-full h-auto">
            <LoadingBar
                color="#0eb1f2"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
                transitionTime={1000}
            />
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
                                        {type && (
                                            <div className="w-auto h-auto ">
                                                <Select
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
                                    <ProductItem data={item} cateType={item.category.slug} loading={progress} />
                                </div>
                            ))}
                        </div>
                        {prods?.length > 0 && (
                            <div className="w-full h-auto mt-5 flex justify-center items-end">
                                <Paginate itemCount={totalProds} itemsPerPage={limit} onSetPage={setPage} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProduct
