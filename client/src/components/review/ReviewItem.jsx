import React from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { toTimestamp } from 'utils/helper'
import { Icon } from 'components'
import * as apis from 'apis'

const ReviewItem = ({ data, isNew, onSetIsNew, onSetIsEdit, reply }) => {
    console.log({ data })
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
            <div className="w-full flex justify-center items-center relative">
                <div key={data._id} className="w-full h-auto flex gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src={
                                data?.user?.photo ||
                                'https://res.cloudinary.com/dqsmvz7lv/image/upload/v1687345761/Phonestore/qviw1rylnqoqjmeyrucb.jpg'
                            }
                            alt={data?.user?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        className={`flex-1 h-full flex flex-col ${
                            reply ? 'bg-[#f8f9fa] border border-[#e1e4e6] rounded-md p-[8px_12px]' : ''
                        }`}
                    >
                        <h2 className="text-[#32373d] font-semibold font-robotoCondensed">{data?.user?.name}</h2>
                        <p className="text-sm text-[#444b52] font-medium mb-2 font-robotoCondensed">{data?.content}</p>
                        <div className="w-full flex items-center gap-2">
                            <span className="text-sm font-normal text-[#939ca3] mr-1">
                                {moment(toTimestamp(data.createdAt) * 1000).fromNow()}
                            </span>
                            {!reply && (
                                <span
                                    onClick={() => onSetIsEdit({ rId: data._id, uId: curUser?.data?._id })}
                                    className="flex items-center text-[#939ca3] text-sm hover:text-blue-400 cursor-pointer pl-3 border-l border-gray-500"
                                >
                                    Reply
                                </span>
                            )}
                            {curUser?.data?._id === data.user._id && (
                                <div className="flex text-sm">
                                    <span className="flex items-end font-normal text-gray-500 mr-1">
                                        <Icon.BsDot size={18} />
                                    </span>
                                    <span
                                        onClick={() => onSetIsEdit({ rId: data._id, uId: curUser?.data?._id })}
                                        className="flex items-center text-[#939ca3] hover:text-yellow-400 cursor-pointer pr-3 border-r border-gray-500"
                                    >
                                        Edit
                                    </span>
                                    <span
                                        onClick={() => handleDeleteReview(data.product, data._id, data.user._id)}
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
        </div>
    )
}

export default ReviewItem
