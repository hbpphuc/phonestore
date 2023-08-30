import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getAllCategories } from 'redux/app/action'
import { publicRoutes } from 'routes/paths'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
    const { categories } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <div className="w-full">
            <h2 className="bg-main text-white text-lg font-semibold uppercase p-[14px_15px] mb-0">ALL CATEGORIES</h2>
            <ul className="border flex flex-col-reverse">
                {categories?.data?.map((item) => (
                    <li key={item.slug} className="p-5">
                        <NavLink
                            to={`${publicRoutes.products}/${item.slug}`}
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

export default Navbar
