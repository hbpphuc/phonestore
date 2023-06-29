import React, { useEffect, useState } from 'react'
import { Section, Slider } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/action'

const Home = () => {
    const { categories, cateId } = useSelector((state) => state.app)
    const [prodData, setProdData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    useEffect(() => {
        categories?.data.filter((item) => item._id === cateId && setProdData(item.products))
    }, [cateId])

    return (
        <div className="w-full h-full mb-[30px] flex flex-col items-center">
            <Slider />
            <Section prodData={prodData} cateData={categories} type="product" title="Featured Product" />
            <Section type="post" title="Blog" />
        </div>
    )
}

export default Home
