import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import * as apis from '../../apis'
import { Icon, Loading } from '../../components'

const ReviewWriter = ({ id, onSetIsNew, isEdit, onSetIsEdit, isReply, onSetIsReply }) => {
    const { deviceWidth } = useSelector((state) => state.app)
    const [isLoading, setIsLoading] = useState(false)
    const [review, setReview] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        let res

        if (isReply) {
            setIsLoading(true)
            res = await apis.createReplyReview(isReply, data)
            setIsLoading(false)
        } else if (isEdit && isEdit?.uId === review?.user._id) {
            setIsLoading(true)
            res = await apis.updateReviewOnProduct(id, isEdit.rId, data)
            setIsLoading(false)
        } else {
            setIsLoading(true)
            res = await apis.createReviewOnProduct(id, data)
            setIsLoading(false)
        }

        if (res?.status === 'success') {
            onSetIsNew((prev) => !prev)
            reset({ content: '' })
            onSetIsEdit(false)
            onSetIsReply(null)
        } else {
            Swal.fire('Oops!', res?.message, 'error')
        }
    }

    useEffect(() => {
        const getReview = async () => {
            const res = await apis.getReview(isEdit?.rId)
            setReview(res?.data?.data)
            reset({
                content: res?.data?.data?.content,
            })
        }
        if (isEdit) getReview()
        reset({
            content: '',
        })
    }, [isEdit])

    return (
        <div className="w-full h-auto mb-2 md:mb-4 xl:mb-8 flex justify-center">
            <form
                className="w-full h-10 sm:h-12 lg:w-[90%] flex justify-end gap-1 md:gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full relative flex justify-end">
                    <input
                        id="content"
                        placeholder="Enter review..."
                        spellCheck={false}
                        {...register('content', { required: true })}
                        className={`w-full p-[5px] md:p-[10px] bg-white border-b ${
                            isEdit ? 'border-yellow-400' : isReply ? 'border-[#17a2b8]' : 'border-main'
                        } outline-none font-robotoCondensed`}
                    />
                    {errors.email && <i className="text-sm text-red-500">Content is required.</i>}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0">
                        {(isEdit || isReply) && (
                            <span
                                onClick={() => {
                                    onSetIsEdit(false)
                                    onSetIsReply(null)
                                }}
                                className="w-6 h-6 flex justify-center items-center cursor-pointer rounded-full"
                            >
                                <Icon.IoMdCloseCircle color="#c3c3c3" size={deviceWidth > 640 ? 28 : 20} />
                            </span>
                        )}
                    </div>
                </div>
                <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className={`flex justify-center items-center w-12 f-full md:w-14 lg:w-16 md:p-3 ${
                        isEdit ? 'bg-yellow-400 text-black' : isReply ? 'bg-[#17a2b8] text-white' : 'bg-main text-white'
                    } ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isLoading ? (
                        <Loading size={8} color="white" />
                    ) : (
                        <Icon.BiSend size={deviceWidth > 640 ? 28 : 20} />
                    )}
                </button>
            </form>
        </div>
    )
}

export default ReviewWriter
