import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as apis from '../../apis'
import { Input, Loading } from '../../components'

const ReviewWriter = ({ id, onSetIsNew, isEdit, onSetIsEdit, isReply, onSetIsReply }) => {
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
                content: res?.data?.data?.content || '',
            })
        }
        getReview()
    }, [isEdit])

    return (
        <div className="w-full h-auto mb-8 flex justify-center">
            <form className="w-[90%] flex gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="content"
                    placeHolder="Enter review..."
                    register={register}
                    validate={{ required: true }}
                    errors={errors}
                    errmsg="Content is required."
                    className=" p-[10px_10px] bg-white border-b border-main outline-none font-robotoCondensed"
                />
                <div className="flex gap-2">
                    <button
                        disabled={isLoading ? true : false}
                        type="submit"
                        className={`p-3 bg-main text-white ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isLoading ? <Loading size={8} color="white" /> : isEdit || isReply ? 'OK' : 'Send'}
                    </button>
                    {(isEdit || isReply) && (
                        <button
                            onClick={() => {
                                onSetIsEdit(false)
                                onSetIsReply(null)
                            }}
                            type="button"
                            className="p-3 bg-gray-400 text-white cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ReviewWriter
