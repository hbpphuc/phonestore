import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import * as apis from '../apis'
import { login } from '../redux/user/userSlice'

const RegisterForm = ({ onSetForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const res = await apis.requestSignup(data)
        if (res.status === 'success') {
            Swal.fire(
                'Congratulation!',
                'An email confirm was send into your mail. Please check it and confirm to final sign up!',
                'success'
            ).then(onSetForm((prev) => !prev))
        } else {
            if (res.status === 'fail') {
                Swal.fire('Oops!', res.message, 'error')
            } else {
                res?.error && Object.values(res?.error).map((item) => Swal.fire('Oops!', item.message, 'error'))
            }
        }
    }

    return (
        <div className="min-w-[500px] w-full h-full flex flex-col items-center">
            <h1 className="w-full mb-5 font-semibold text-xl text-[#505050] text-center ">REGISTER</h1>
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: true })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    {errors.name && <p className="text-sm text-red-500">Name is required.</p>}
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    {errors.email && <p className="text-sm text-red-500">Email is required.</p>}
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', { required: true, min: 8 })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    {errors.password && <p className="text-sm text-red-500">Password is required.</p>}
                </div>
                <div className="w-full">
                    <input
                        type="password"
                        placeholder="Password confirm"
                        {...register('passwordConfirm', { required: true, min: 8 })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    {errors.passwordConfirm && <p className="text-sm text-red-500">Password confirm is required.</p>}
                </div>

                <button
                    type="submit"
                    className="w-full mb-5 p-[12px_10px] bg-main text-white hover:bg-[#333] transition-colors"
                >
                    Create Account
                </button>
            </form>
            <button onClick={() => onSetForm((prev) => !prev)} className="hover:text-main transition-colors">
                Cancel
            </button>
        </div>
    )
}

export default RegisterForm
