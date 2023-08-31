import React from 'react'
import * as apis from 'apis'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { toTimestamp } from 'utils/helper'
import { Icon } from 'components'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const ReviewItem = ({ data, isNew, onSetIsNew, onSetIsEdit }) => {
    const { curUser } = useSelector((state) => state.user)

    const handleDeleteReview = async (pId, rId, uId) => {
        Swal.fire({
            icon: 'warning',
            text: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#E52D2D',
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (uId === curUser?.data?._id) {
                    const res = await apis.deleteReviewOnProduct(pId, rId)
                    if (res?.status === 'success') {
                        onSetIsNew(!isNew)
                    } else {
                        toast.error(res?.message)
                    }
                } else {
                    toast.error('Oops! Something went wrong')
                }
            }
        })
    }
    return (
        <div className="w-full h-auto flex flex-col">
            {data?.length > 0 ? (
                data
                    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map((item) => (
                        <div key={item._id} className="w-full flex justify-center items-center relative">
                            <div key={item._id} className="w-full h-auto flex gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={
                                            item?.user?.photo ||
                                            'https://res.cloudinary.com/dqsmvz7lv/image/upload/v1687345761/Phonestore/qviw1rylnqoqjmeyrucb.jpg'
                                        }
                                        alt={item?.user?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 h-full flex flex-col">
                                    <h2 className="text-[#32373d] font-semibold">{item?.user?.name}</h2>
                                    <p className="text-sm text-[#444b52] font-medium mb-2">{item?.content}</p>
                                    <div className="w-full flex">
                                        <span className="text-sm font-normal text-[#939ca3] mr-1">
                                            {moment(toTimestamp(item.createdAt) * 1000).fromNow()}
                                        </span>
                                        {curUser?.data?._id === item.user._id && (
                                            <div className="flex text-sm">
                                                <span className="flex items-end font-normal text-gray-500 mr-1">
                                                    <Icon.BsDot size={18} />
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        onSetIsEdit({ rId: item._id, uId: curUser?.data?._id })
                                                    }
                                                    className="flex items-center text-[#939ca3] hover:text-yellow-400 cursor-pointer pr-3 border-r border-gray-500"
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    onClick={() =>
                                                        handleDeleteReview(item.product, item._id, item.user._id)
                                                    }
                                                    className="flex items-center pl-3 text-[#939ca3] hover:text-red-600 cursor-pointer"
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            ) : (
                <div className="w-full h-auto flex justify-center items-center">
                    <p className="text-base text-primary">This product have no review.</p>
                </div>
            )}
        </div>
    )
}

export default ReviewItem
