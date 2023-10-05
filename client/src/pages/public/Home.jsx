import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/app/action'
import { Section, Section3, Slider } from '../../components'

const Home = () => {
    const { categories } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <div className="w-full h-full mb-[30px] flex flex-col items-center">
            <Slider />
            <div className="w-full xl:w-main xl:px-[10px] min-[1400px]:px-0">
                <Section cateData={categories} title="Featured Products" />
            </div>
            <div className="w-full xl:w-main xl:px-[10px] min-[1400px]:px-0">
                <Section3 title="news" />
            </div>
        </div>
    )
}

export default Home
