import React from 'react'
import { Section, Slide } from '../../components'

const Home = () => {
    const data = [1, 2, 3, 4]
    return (
        <div className="w-full h-full mb-[30px] flex flex-col items-center">
            <Slide />
            <Section data={data} type="product" title="Featured Product" />
            <Section data={data} type="product" title="Sale Product" />
            <Section data={data} type="product" title="Hot Product" />
            <Section data={data} type="post" title="Blog" />
        </div>
    )
}

export default Home
