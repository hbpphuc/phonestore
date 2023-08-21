import { Button, Input } from 'components'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as apis from 'apis'
import Swal from 'sweetalert2'

const ReviewWriter = ({ id, onSetIsNew }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        const res = await apis.createReviewOnProduct(id, data)
        if (res?.status === 'success') {
            console.log(res)
            onSetIsNew((prev) => !prev)
            reset({ content: '' })
        } else {
            Swal.fire('Oops!', res?.message, 'error')
        }
    }

    return (
        <div className="w-full h-auto mb-8 flex justify-center ">
            <form className="w-[90%] flex gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="content"
                    placeHolder="Enter review..."
                    register={register}
                    validate={{ required: true }}
                    errors={errors}
                    errmsg="Content is required."
                    className=" p-[10px_10px] bg-white border-b border-main outline-none"
                />
                <Button type="submit" className="p-3 bg-main text-white">
                    Send
                </Button>
            </form>
        </div>
    )
}

export default ReviewWriter
