import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import { Icon, Input, Loading } from 'components'
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

    const { register: register3, handleSubmit: handleSubmit3 } = useForm()

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')

    const handleChange = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = async (data) => {
        const res = await apis.updateMe(data)
        if (res?.status === 'success') {
            toast.success('Your account updated!')
        } else toast.error(res?.message)
    }

    const onUpdatePassword = async (data) => {
        const res = await apis.updatePassword(data)
        if (res?.status === 'success') {
            reset2({
                passwordCurrent: '',
                password: '',
                passwordConfirm: '',
            })
            toast.success('Your current password updated!')
        } else toast.error(res?.message)
    }

    const onUpdateImage = async (data) => {
        const formData = new FormData()
        const avatar = { photo: file }

        for (let i of Object.entries(avatar)) {
            formData.append(i[0], i[1])
        }

        setLoading(true)
        const res = await apis.updateAvatar(formData)
        setLoading(false)
        if (res?.status === 'success') {
            toast.success('Your avatar updated!')
            navigate(0)
        } else toast.error(res?.message)
    }

    useEffect(() => {
        reset({
            name: curUser?.data?.name,
            email: curUser?.data?.email,
            photo: curUser?.data?.photo,
            phone: curUser?.data?.phone || '',
            address: curUser?.data?.address || '',
        })
    }, [])

    return (
        <div className="w-full h-auto flex flex-col gap-4">
            <div className="w-full flex justify-center items-center border-b pb-4">
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit3(onUpdateImage)}>
                    <div className="flex justify-end relative">
                        <img
                            src={preview || curUser?.data?.photo}
                            alt={curUser?.data?.name}
                            className="w-[180px] md:w-[240px] h-[180px] md:h-[240px] object-cover rounded-full "
                        />
                        <div className="w-full flex flex-col-reverse items-center gap-2">
                            <Tippy content={'Choose new photo'} placement="top">
                                <label htmlFor="photo" className="absolute bottom-0 left-6 p-2 save-btn cursor-pointer">
                                    <Icon.TbPhotoEdit size={24} />
                                </label>
                            </Tippy>
                            <input id="photo" type="file" {...register3('photo')} onChange={handleChange} hidden />
                        </div>
                        <div className="absolute bottom-0 right-6">
                            <Tippy content={'Update photo'} placement="top">
                                <button
                                    onClick={(e) => {
                                        if (file === null) {
                                            e.preventDefault()
                                            toast.info('Please choose new photo before update!')
                                        }
                                    }}
                                    type="submit"
                                    disabled={loading ? true : false}
                                    className="p-2 save-btn"
                                >
                                    {loading ? (
                                        <Loading color="white" size={24} type={PuffLoader} />
                                    ) : (
                                        <Icon.AiOutlineCloudUpload size={24} />
                                    )}
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-full h-auto flex flex-col lg:flex-row gap-4">
                <div className="flex-1 lg:ml-4">
                    <h1 className="w-full h-auto flex justify-center sm:justify-start sm:text-lg md:text-xl font-bold uppercase gradient-text">
                        Your Account Setting
                    </h1>
                    <div className="w-full mt-2 sm:mt-5">
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
                            </div>
                            <div className="w-full flex justify-center sm:justify-end items-center mt-4">
                                <button type="submit" className="w-1/2 sm:w-max p-[10px_20px] save-btn">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex-1 lg:mr-6 border-t sm:border-none">
                    <h1 className="w-full h-auto flex justify-center sm:justify-start sm:text-lg md:text-xl font-bold uppercase gradient-text mt-4 sm:mt-0">
                        Password Change
                    </h1>
                    <div className="w-full mt-2 sm:mt-5">
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
                                <div className="w-full flex justify-center sm:justify-end items-center">
                                    <button type="submit" className="w-1/2 sm:w-max p-[10px_20px] save-btn">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccount
