import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as apis from '../../apis'
import Button from '../general/Button'
import Loading from '../general/Loading'

const ForgotForm = ({ onSetForm }) => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setIsLoading(true)
        const res = await apis.forgotPassword(data)
        setIsLoading(false)

        if (res.status === 'success') {
            Swal.fire('Congratulation!', res.message, 'success')
        } else {
            Swal.fire('Oops!', res.message, 'error')
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1 className="w-full mb-5 font-semibold text-xl text-[#505050] text-center ">RESET YOUR PASSWORD</h1>
            <p className="w-full p-[12px_12px] mb-[10px] border border-secondary text-sm text-primary">
                We will send you an email to reset your password.
            </p>
            <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col items-center justify-center mb-5">
                    <label htmlFor="emailForgot" className="mb-[10px] text-sm text-primary cursor-pointer">
                        Email
                    </label>
                    <input
                        id="emailForgot"
                        type="email"
                        spellCheck={false}
                        className="w-[70%] p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors.email && <i className="text-sm text-red-500">Email is required.</i>}
                </div>
                <div className="w-full flex justify-center">
                    <Button
                        type="submit"
                        disable={isLoading ? true : false}
                        className={`w-[140px] p-[10px_8px] ${
                            isLoading ? 'bg-[#333] cursor-not-allowed' : 'bg-main'
                        } text-white hover:bg-[#333] transition-colors`}
                    >
                        {isLoading ? <Loading size={8} color="white" /> : 'Submit'}
                    </Button>
                </div>
            </form>
            <Button text="Cancel" onClick={() => onSetForm(0)} className="mt-5 hover:text-main transition-colors" />
        </div>
    )
}

export default ForgotForm
