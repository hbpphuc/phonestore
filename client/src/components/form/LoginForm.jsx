import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { login } from '../../redux/user/userSlice'
import * as apis from '../../apis'
import { Loading, Button, Icon } from '../../components'

const LoginForm = ({ onSetForm }) => {
    const [pw, setPw] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const changeIconPw = pw === true ? false : true

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        setIsLoading(true)
        const res = await apis.login(data)
        setIsLoading(false)

        if (res.status === 'success') {
            dispatch(login({ isLoggedIn: true }))
            Swal.fire('Congratulation!', 'User login successfully!', 'success').then(() => navigate(0))
        } else {
            Swal.fire('Oops!', res.message, 'error')
        }
    }

    return (
        <div className="w-full max-w-[500px] h-full flex flex-col items-center">
            <h1 className="w-full mb-2 sm:mb-5 font-semibold text-xl text-[#505050] text-center ">LOGIN</h1>
            <form
                className="w-full flex flex-col justify-center items-center gap-2 sm:gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        spellCheck={false}
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    {errors.email && <i className="text-sm text-red-500">Email is required.</i>}
                </div>
                <div className="w-full relative">
                    <input
                        type={changeIconPw ? 'password' : 'text'}
                        placeholder="Password"
                        spellCheck={false}
                        {...register('password', { required: true, min: 8 })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    <span
                        className="absolute right-5 top-[50%] -translate-y-1/2 cursor-pointer text-[#aaaaaa] hover:text-main"
                        onClick={() => {
                            setPw(changeIconPw)
                        }}
                    >
                        {changeIconPw ? <Icon.RiEyeCloseLine size={20} /> : <Icon.RiEyeFill size={20} />}
                    </span>
                    {errors.password && <i className="text-sm text-red-500">Password is required.</i>}
                </div>
                <Button
                    type="submit"
                    disable={isLoading ? true : false}
                    className={`w-[140px] mb-2 sm:mb-3 md:mb-5 p-[10px_8px] ${
                        isLoading ? 'bg-[#333] cursor-not-allowed' : 'bg-main'
                    } text-white hover:bg-[#333] transition-colors`}
                >
                    {isLoading ? <Loading size={8} color="white" /> : 'Sign In'}
                </Button>
            </form>
            <div className="w-full flex justify-between text-sm">
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
            <div className="w-full mt-3 flex justify-center text-sm">
                <Link
                    to={`${process.env.REACT_APP_SERVER_URL}users/login/google`}
                    className="w-full h-10 flex justify-center items-center bg-[#ff5353] text-white transition-colors"
                >
                    Using Google Account
                </Link>
            </div>
        </div>
    )
}

export default LoginForm
