import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as apis from '../../apis'
import Button from '../general/Button'
import Icon from '../general/Icons'
import Loading from '../general/Loading'

const RegisterForm = ({ onSetForm }) => {
    const [isLoading, setIsLoading] = useState(false)

    const [pw, setPw] = useState(false)
    const changeIconPw = pw === true ? false : true

    const [pwc, setPwc] = useState(false)
    const changeIconPwc = pwc === true ? false : true

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setIsLoading(true)
        const res = await apis.requestSignup(data)
        setIsLoading(false)
        if (res.status === 'success') {
            Swal.fire(
                'Congratulation!',
                'An email confirm was send into your mail. Please check it and confirm to final sign up!',
                'success'
            ).then(onSetForm(0))
        } else {
            if (res.status === 'fail') {
                Swal.fire('Oops!', res.message, 'error')
            } else {
                res?.error && Object.values(res?.error).map((item) => Swal.fire('Oops!', item.message, 'error'))
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="w-full mb-5 font-semibold text-xl text-[#505050] text-center ">REGISTER</h1>
            <form className="w-full flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Name"
                        spellCheck={false}
                        {...register('name', { required: true })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    {errors.name && <i className="text-sm text-red-500">Name is required.</i>}
                </div>
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
                <div className="w-full relative">
                    <input
                        type={changeIconPwc ? 'password' : 'text'}
                        placeholder="Password confirm"
                        spellCheck={false}
                        {...register('passwordConfirm', { required: true, min: 8 })}
                        className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                    />
                    <span
                        className="absolute right-5 top-[50%] -translate-y-1/2 cursor-pointer text-[#aaaaaa] hover:text-main"
                        onClick={() => {
                            setPwc(changeIconPwc)
                        }}
                    >
                        {changeIconPwc ? <Icon.RiEyeCloseLine size={20} /> : <Icon.RiEyeFill size={20} />}
                    </span>
                    {errors.passwordConfirm && <i className="text-sm text-red-500">Password confirm is required.</i>}
                </div>
                <Button
                    type="submit"
                    className="w-[160px] p-[10px_8px] bg-main text-white hover:bg-[#333] transition-colors"
                >
                    {isLoading ? <Loading size={8} color="white" /> : 'Create Account'}
                </Button>
            </form>
            <Button text="Cancel" onClick={() => onSetForm(0)} className="mt-5 hover:text-main transition-colors" />
        </div>
    )
}

export default RegisterForm
