import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as apis from '../apis'
import { routes } from '../routes/paths'

const Sidebar = () => {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        const getAllCategory = async () => {
            const res = await apis.getAllCategory()
            if (res.status === 'success') {
                setCategories(res?.data?.data)
            }
        }
        getAllCategory()
    }, [])

    return (
        <div className="w-full">
            <h2 className="bg-main text-white text-lg font-semibold uppercase p-[14px_15px] mb-0">ALL CATEGORIES</h2>
            <ul className="border">
                {categories?.map((item) => (
                    <li key={item.slug} className="p-5">
                        <NavLink
                            to={`${routes.products}/${item.slug}`}
                            className={({ isActive }) => `${isActive ? 'text-main' : ''}`}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
