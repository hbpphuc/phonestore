import React from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { toTimestamp } from '../../utils/helper'
import { Icon } from '../../components'
import * as apis from '../../apis'

const ReviewItem = ({ data, reviewId, onSetIsNew, onSetIsEdit, reply, onSetIsReply }) => {
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
                    let res
                    reviewId
                        ? (res = await apis.deleteReplyReview(reviewId, rId))
                        : (res = await apis.deleteReviewOnProduct(pId, rId))
                    if (res?.status === 'success') {
                        onSetIsNew((prev) => !prev)
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
                <div key={data._id} className="w-full h-auto flex gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full overflow-hidden">
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
                            reply ? 'bg-[#f8f9fa] border border-[#e1e4e6] rounded-md p-[4px_8px] md:p-[8px_12px]' : ''
                        }`}
                    >
                        <h2 className="text-sm md:text-base text-[#32373d] font-semibold font-robotoCondensed">
                            {data?.user?.name}
                        </h2>
                        <p className="text-sm text-[#444b52] font-medium mb-1 md:mb-2 font-robotoCondensed">
                            {data?.content}
                        </p>
                        <div className="w-full flex items-center md:gap-2">
                            <span className="text-xs md:text-sm font-normal text-[#939ca3] mr-1">
                                {moment(toTimestamp(data.createdAt) * 1000).fromNow()}
                            </span>
                            {!reply && (
                                <span
                                    onClick={() => onSetIsReply(data._id)}
                                    className="flex items-center text-[#939ca3] text-xs md:text-sm hover:text-[#17a2b8] cursor-pointer pl-1 md:pl-3 border-l border-gray-500"
                                >
                                    Reply
                                </span>
                            )}
                            {curUser?.data?._id === data.user._id && (
                                <div className="flex text-xs md:text-sm">
                                    <span className="flex items-end font-normal text-gray-500 md:mr-1">
                                        <Icon.BsDot size={18} />
                                    </span>
                                    {!reply && (
                                        <span
                                            onClick={() => onSetIsEdit({ rId: data._id, uId: curUser?.data?._id })}
                                            className="flex items-center text-[#939ca3] hover:text-yellow-400 cursor-pointer pr-1 md:pr-3 border-r border-gray-500"
                                        >
                                            Edit
                                        </span>
                                    )}

                                    <span
                                        onClick={() => handleDeleteReview(data.product, data._id, data.user._id)}
                                        className="flex items-center pl-1 md:pl-3 text-[#939ca3] hover:text-red-600 cursor-pointer"
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
