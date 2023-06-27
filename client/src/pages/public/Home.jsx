import React, { useEffect } from 'react'
import { Section, Slider } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/action'

const Home = () => {
    const data = [1, 2, 3, 4]
    const { categories } = useSelector((state) => state.root)
    const dispatch = useDispatch()

    console.log(categories)

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <div className="w-full h-full mb-[30px] flex flex-col items-center">
            <Slider />
            <Section data={data} type="product" title="Featured Product" />
            <Section data={data} type="product" title="Sale Product" />
            <Section data={data} type="product" title="Hot Product" />
            <Section data={data} type="post" title="Blog" />
        </div>
    )
}

export default Home
