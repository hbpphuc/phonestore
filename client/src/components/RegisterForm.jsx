import React from 'react'
import { useForm } from 'react-hook-form'
import * as apis from '../apis'

const RegisterForm = ({ onSetForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => await apis.signup(data)

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
