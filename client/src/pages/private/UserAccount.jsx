import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input, Loading } from 'components'
import * as apis from 'apis'

const UserAccount = () => {
    const { curUser } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        reset: reset2,
    } = useForm()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        const res = await apis.updateMe(data)
        setLoading(false)
        if (res?.status === 'success') {
            toast.success('Your account updated!')
            navigate(0)
        } else toast.error(res?.message)
    }

    const onUpdatePassword = async (data) => {
        setLoading(true)
        const res = await apis.updatePassword(data)
        setLoading(false)
        if (res?.status === 'success') {
            reset2({
                passwordCurrent: '',
                password: '',
                passwordConfirm: '',
            })
            toast.success('Your current password updated!')
        } else toast.error(res?.message)
    }

    useEffect(() => {
        reset({
            name: curUser?.data?.name,
            email: curUser?.data?.email,
            imageCover: curUser?.data?.photo,
            phone: curUser?.data?.phone || '',
            address: curUser?.data?.address || '',
        })
    }, [])

    return (
        <div className="w-full h-auto flex gap-4">
            <div className="flex-1 ml-4">
                <h1 className="w-full h-auto flex text-xl font-bold uppercase gradient-text">Your Account Setting</h1>
                <div className="w-full mt-5">
                    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col gap-4">
                            <Input
                                id="name"
                                label="Name"
                                placeHolder="Enter name"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Name is required."
                                user
                            />
                            <Input
                                id="email"
                                label="Email address"
                                type="email"
                                placeHolder="Enter email"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Email is required."
                                user
                            />
                            <Input
                                id="phone"
                                label="Phone number"
                                type="tel"
                                placeHolder="Enter phone number"
                                register={register}
                                errors={errors}
                                user
                            />
                            <Input
                                id="address"
                                label="Home address"
                                type="text"
                                placeHolder="Enter home address"
                                register={register}
                                errors={errors}
                                user
                            />
                            {/* <div className="flex justify-end">
                                <img
                                    src={curUser?.data?.photo}
                                    alt={curUser?.data?.name}
                                    className="w-[100px] h-[100px] object-cover rounded-full"
                                />
                                <Input
                                    id="imageCover"
                                    label="Choose new photo"
                                    type="file"
                                    register={register}
                                    validate={{ required: true }}
                                    errors={errors}
                                    errmsg="Image cover is required."
                                    user
                                    hidden
                                />
                            </div> */}
                            <div className="w-full flex justify-end items-center">
                                <button
                                    type="submit"
                                    className="w-max p-[10px_20px] text-white text-base font-medium bg-main border border-transparent rounded-full uppercase save-btn-hover"
                                >
                                    {loading ? <Loading color="white" size={6} /> : 'Save setting'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex-1 mr-6">
                <h1 className="w-full h-auto flex text-xl font-bold uppercase gradient-text">Password Change</h1>
                <div className="w-full mt-5">
                    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit2(onUpdatePassword)}>
                        <div className="w-full flex flex-col gap-4">
                            <Input
                                id="passwordCurrent"
                                label="Current password"
                                type="password"
                                placeHolder="Enter password"
                                register={register2}
                                validate={{ required: true }}
                                errors={errors2}
                                errmsg="Current Password is required."
                                user
                            />
                            <Input
                                id="password"
                                label="New password"
                                type="password"
                                placeHolder="Enter new password"
                                register={register2}
                                validate={{ required: true }}
                                errors={errors2}
                                errmsg="New Password is required."
                                user
                            />
                            <Input
                                id="passwordConfirm"
                                label="Confirm password"
                                type="password"
                                placeHolder="Enter confirm password"
                                register={register2}
                                validate={{ required: true }}
                                errors={errors2}
                                errmsg="Confirm Password is required."
                                user
                            />
                            <div className="w-full flex justify-end items-center">
                                <button
                                    type="submit"
                                    className="w-max p-[10px_20px] text-white text-base font-medium bg-main border border-transparent rounded-full uppercase save-btn-hover"
                                >
                                    {loading ? <Loading color="white" size={6} /> : 'Save'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserAccount
