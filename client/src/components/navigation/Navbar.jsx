import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getAllCategories } from 'redux/app/action'
import { publicRoutes } from 'routes/paths'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { iconsCate } from 'utils/menu'

const Navbar = () => {
    const { categories, deviceWidth } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    const cateVer2 = categories?.data?.map((item) => ({
        slug: item.slug,
        name: item.name,
        icon: iconsCate?.find((el) => el.id === item.slug)?.icon,
    }))

    return (
        <div className="w-full">
            <h2 className="bg-main text-white xl:text-lg font-semibold uppercase p-[14px_15px] mb-0 hidden lg:block">
                ALL CATEGORIES
            </h2>
            <ul className="flex px-[10px] lg:px-0 gap-2 mt-2 overflow-x-auto hidden-scrollbar lg:mt-0 lg:flex-col lg:justify-start lg:border lg:flex-nowrap">
                {deviceWidth >= 1024
                    ? categories?.data?.map((item) => (
                          <li key={item.slug} className="p-3 xl:p-4">
                              <NavLink
                                  to={`${publicRoutes.products}/${item.slug}`}
                                  className={({ isActive }) => (isActive ? 'text-main' : '')}
                              >
                                  {item.name}
                              </NavLink>
                          </li>
                      ))
                    : cateVer2?.map((item) => (
                          <li key={item.slug} className="border rounded">
                              <NavLink
                                  to={`${publicRoutes.products}/${item.slug}`}
                                  className={({ isActive }) =>
                                      `p-3 xl:p-5 flex gap-1 justify-center items-center hover:text-main transition-colors ${
                                          isActive ? 'text-main' : ''
                                      }`
                                  }
                              >
                                  {item.icon}
                                  {item.name}
                              </NavLink>
                          </li>
                      ))}
            </ul>
        </div>
    )
}

export default memo(Navbar)
