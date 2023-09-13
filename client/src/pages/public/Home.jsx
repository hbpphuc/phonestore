import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from 'redux/app/action'
import { Section, Section2, Section3, Slider } from 'components'

const Home = () => {
    const { categories } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <div className="w-full h-full mb-[30px] flex flex-col items-center">
            <Slider />
            <Section cateData={categories} title="Featured Products" />
            {/* <Section2 title="hot collections" /> */}
            <Section3 title="news" />
        </div>
    )
}

export default Home
