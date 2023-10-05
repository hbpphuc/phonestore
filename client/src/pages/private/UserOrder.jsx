import React, { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import Tippy from '@tippyjs/react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Icon } from '../../components'
import * as apis from '../../apis'

const UserOrder = () => {
    const { deviceWidth } = useSelector((state) => state.app)

    const [userOrder, setUserOrder] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUserOrder = async () => {
            setLoading(true)
            const res = await apis.getUserOrders()
            setUserOrder(res?.data?.userOrder)
            setLoading(false)
        }
        getUserOrder()
    }, [isUpdate])

    const handleCancelOrder = async (id) => {
        const res = await apis.userCancelOrders({ oId: id })
        if (res?.status === 'success') {
            toast.success('The order has been cancelled!')
            setIsUpdate((prev) => !prev)
        }
    }

    return (
        <div className="w-full h-auto flex flex-col">
            <h1 className="w-full h-auto flex justify-center sm:justify-start sm:text-lg md:text-xl font-bold uppercase gradient-text mb-4 px-[10px]">
                Your Order
            </h1>
            {loading ? (
                <Skeleton className="h-10 m-4" />
            ) : deviceWidth >= 1280 ? (
                <div className="w-full">
                    <table className="table-auto w-full mb-6 text-left border-collapse">
                        <thead className="w-full text-sm">
                            <tr className="border-b border-admin text-center">
                                <th className="p-2">Image</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Color</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Quantity</th>
                                <th className="p-2">Order at</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Status</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody className="w-full text-sm ">
                            {userOrder?.length > 0 ? (
                                userOrder?.map((item, index) =>
                                    item.products.map((el, index) => (
                                        <tr key={el._id} className="text-center border-b border-gray-300">
                                            <Fragment key={index}>
                                                <td className="p-2">
                                                    <img
                                                        src={el.product?.imageCover}
                                                        alt={el.product?.name}
                                                        className="w-10 h-10 object-cover"
                                                    />
                                                </td>
                                                <td className="p-2 whitespace-nowrap">{el.product?.name} </td>
                                                <td className="p-2">{el.color}</td>
                                                <td className="p-2">${el.product?.price} </td>
                                                <td className="p-2">{el.count}</td>
                                            </Fragment>
                                            <td className="p-2">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                            <td className="p-2">${item.total}</td>
                                            <td
                                                className={`p-2 font-medium ${
                                                    item.status === 'Shipping'
                                                        ? 'text-yellow-400'
                                                        : item.status === 'Delivered'
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                }`}
                                            >
                                                {item.status}
                                            </td>
                                            {item.status === 'Shipping' && (
                                                <td>
                                                    <Tippy content="Cancel Order">
                                                        <span
                                                            onClick={() => handleCancelOrder(item._id)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Icon.FcCancel size={24} />
                                                        </span>
                                                    </Tippy>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr className="text-center">
                                    <td colSpan={8} className="p-2">
                                        <h3 className="text-sm md:text-lg text-center text-gray-500 font-medium w-full h-auto mb-3">
                                            You have no order
                                        </h3>
                                        <Link
                                            to="/products"
                                            className="text-sm uppercase sm:text-lg text-center underline text-blue-600 font-medium w-full h-auto"
                                        >
                                            Go to Shopping now!
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="w-full flex flex-wrap">
                    {userOrder?.length > 0 ? (
                        userOrder?.map((item, index) =>
                            item.products.map((el, index) => (
                                <div
                                    key={el.id}
                                    className="p-[10px] w-full min-[425px]:w-1/2 min-[992px]:w-1/3 flex flex-col justify-between bg-white"
                                >
                                    <div className="w-full border border-gray-200 rounded-lg shadow-md">
                                        <img
                                            className="w-full flex justify-center items-center p-4 rounded-t-lg object-contain"
                                            src={el.product.imageCover}
                                            alt={el.product.name}
                                        />
                                        <div className="px-5 pb-5">
                                            <h5 className="text-center lg:text-lg line-clamp-1 font-semibold tracking-tight">
                                                {el.product.name}
                                            </h5>
                                            <div className="text-center py-2">
                                                {moment(item.createdAt).format('DD/MM/YYYY')}
                                            </div>
                                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                                <div className="w-full flex md:flex-col justify-evenly items-center md:items-start">
                                                    <span className="py-1 md:py-0 lg:text-lg font-bold text-gray-900 dark:text-yellow-500">
                                                        ${item.total}
                                                    </span>
                                                    <span className="font-medium lg:font-bold text-gray-900">
                                                        Qty: {el.count}
                                                    </span>
                                                </div>
                                                <div className="flex flex-1 justify-end items-center gap-2">
                                                    <span
                                                        className={`flex items-center font-medium ${
                                                            item.status === 'Shipping'
                                                                ? 'text-yellow-400'
                                                                : item.status === 'Delivered'
                                                                ? 'text-green-500'
                                                                : 'text-red-500'
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>

                                                    {/* <Tippy content="Edit" className="text-base">
                                                    {isUpdate && item._id === editItem ? (
                                                        <Button
                                                            onClick={() => handleUpdate()}
                                                            className="w-[26px] h-[26px] p-1 border rounded-md hover:brightness-125 transition-all"
                                                        >
                                                            <Icon.MdDownloadDone size={16} />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() => handleEdit(item._id, item.status)}
                                                            className="w-[26px] h-[26px] p-1 border rounded-md hover:brightness-125 transition-all"
                                                        >
                                                            <Icon.BiSolidEditAlt size={16} />
                                                        </Button>
                                                    )}
                                                </Tippy> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        <div className="w-full flex flex-col justify-center items-center">
                            <h3 className="text-sm md:text-lg text-center text-gray-500 font-medium w-full h-auto mb-3">
                                You have no order
                            </h3>
                            <Link
                                to="/products"
                                className="text-sm uppercase sm:text-lg text-center underline text-blue-600 font-medium w-full h-auto"
                            >
                                Go to Shopping now!
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserOrder
