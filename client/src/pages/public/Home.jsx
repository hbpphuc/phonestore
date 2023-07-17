import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from 'redux/app/action'
import { Section, Section2, Slider } from 'components'

const Home = () => {
    const { categories, products, cateId } = useSelector((state) => state.app)
    const [prodCate, setProdCate] = useState(null)
    const [prodData, setProdData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
        setProdData(products?.data)
    }, [])

    useEffect(() => {
        categories?.data.filter((item) => item._id === cateId && setProdCate(item.products))
    }, [cateId])

    return (
        <div className="w-full h-full mb-[30px] flex flex-col items-center">
            <Slider />
            <Section prodData={prodCate} cateData={categories} type="product" title="Featured Products" />
            <Section2 />
            <Section type="post" title="Blog" />
        </div>
    )
}

export default Home
