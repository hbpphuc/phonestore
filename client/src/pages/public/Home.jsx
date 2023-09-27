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
            <div className="w-full xl:w-main px-[10px]">
                <Section cateData={categories} title="Featured Products" />
            </div>
            <div className="w-full xl:w-main px-[10px]">
                <Section3 title="news" />
            </div>
        </div>
    )
}

export default Home
