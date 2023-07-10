import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { login } from '../redux/user/userSlice'
import * as apis from '../apis'
import Button from './Button'

const LoginForm = ({ onSetForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const res = await apis.login(data)

        if (res.status === 'success') {
            dispatch(login({ isLoggedIn: true, curUser: res.data, token: res.token }))
            Swal.fire('Congratulation!', 'User login successfully!', 'success').then(() => navigate(0))
        } else {
            Swal.fire('Oops!', res.message, 'error')
        }
    }

    return (
        <div className="min-w-[500px] w-full h-full flex flex-col items-center">
            <h1 className="w-full mb-5 font-semibold text-xl text-[#505050] text-center ">LOGIN</h1>
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                <Button
                    text="Sign In"
                    type="submit"
                    className="w-full mb-5 p-[12px_10px] bg-main text-white hover:bg-[#333] transition-colors"
                />
            </form>
            <div className="w-full mb-5 flex justify-between">
                <Button
                    text="Forgot Your Password?"
                    onClick={() => onSetForm(2)}
                    className="hover:text-main transition-colors"
                />
                <Button
                    text="Create Account"
                    onClick={() => onSetForm(1)}
                    className="hover:text-main transition-colors"
                />
            </div>
        </div>
    )
}

export default LoginForm
