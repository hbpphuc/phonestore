import React, { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import Tippy from '@tippyjs/react'
import Skeleton from 'react-loading-skeleton'
import * as apis from 'apis'
import { Icon } from 'components'
import { toast } from 'react-toastify'

const UserOrder = () => {
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
        <div className="w-full h-auto flex flex-col gap-2">
            <div className="flex-1 ml-4">
                <h1 className="w-full h-auto flex text-xl font-bold uppercase gradient-text">Your Order</h1>
            </div>
            {loading ? (
                <Skeleton className="h-10 m-4" />
            ) : (
                <div className="w-full pl-4">
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
                            {userOrder?.map((item, index) =>
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
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UserOrder
