import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import moment from 'moment'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import * as apis from 'apis'
import { Button, Icon } from 'components'

const ManageOrders = () => {
    const [orders, setOrders] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

    const [isNew, setIsNew] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const [status, setStatus] = useState(null)

    const statusOpt = [
        { label: 'Canceled', value: 'Canceled' },
        { label: 'Shipping', value: 'Shipping' },
        { label: 'Delivered', value: 'Delivered' },
    ]

    const { register, handleSubmit } = useForm()

    const getAllOrder = async () => {
        const res = await apis.getAllOrder()
        setOrders(res?.data?.data)
    }

    useEffect(() => {
        getAllOrder()
    }, [page, isNew])

    const handleEdit = (id, status) => {
        setIsUpdate(true)
        setEditItem(id)
        setStatus(statusOpt.find((item) => item.value === status))
    }

    const handleUpdate = async () => {
        const res = await apis.updateOrder(editItem, { status: status.value })
        if (res.status === 'success') {
            setIsNew(!isNew)
            toast.success('Update order successfully!')
            setEditItem(null)
            setIsUpdate(false)
        } else {
            toast.error('Oops! Something went wrong')
        }
    }
    return (
        <div className="w-full h-auto mt-[60px]">
            <div className="w-full flex justify-between items-center px-4 border-b border-[#999]">
                <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold uppercase">
                    manage order
                </h1>
            </div>

            {/* <div className="w-full mt-4 px-4 flex justify-end items-center">
                <form className="w-[400px] flex gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            placeholder="Search email or name..."
                            {...register('q')}
                            className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                        />
                    </div>
                    <Button type="submit" className="p-[10px] bg-main text-white hover:bg-[#333] transition-colors">
                        <Icon.TbSearch size={24} />
                    </Button>
                </form>
            </div> */}

            <div className="w-full h-auto p-4 grid grid-cols-4 gap-2">
                {orders?.map((item) =>
                    item.products.map((el) => (
                        <div
                            key={el.id}
                            className="w-full flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <img
                                className="w-full flex justify-center items-center p-4 rounded-t-lg object-contain"
                                src={el.product.imageCover}
                                alt={el.product.name}
                            />
                            <div className="px-5 pb-5">
                                <h5 className="text-lg line-clamp-1 font-semibold tracking-tight text-gray-900 dark:text-white">
                                    {el.product.name}
                                </h5>
                                <div className="flex py-2 items-center justify-between text-[#999]">
                                    <span className="text-[#999]">{moment(item.createdAt).format('DD/MM/YYYY')}</span>
                                    <span className="text-[#999]"> {item.orderBy.email}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-gray-900 dark:text-yellow-400">
                                            ${el.product.price}
                                        </span>
                                        <span className="font-bold text-gray-900 dark:text-gray-400">
                                            Qty: {el.count}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 justify-end items-center gap-2">
                                        {editItem && item._id === editItem ? (
                                            <Select
                                                value={status}
                                                onChange={setStatus}
                                                options={statusOpt}
                                                placeholder="Status"
                                                isSearchable={false}
                                                className="font-semibold text-sm text-primary "
                                            />
                                        ) : (
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
                                        )}
                                        <Tippy content="Edit" className="text-base">
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
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ManageOrders
