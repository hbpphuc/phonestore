import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button, Icon, Loading } from '../../components'
import * as apis from '../../apis'

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()

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
        const res = await apis.resetPassword(data, token)
        setIsLoading(false)

        if (res.status === 'success') {
            Swal.fire('Congratulation!', 'Reset password successfully!', 'success').then(() => navigate('/'))
        } else {
            Swal.fire('Oops!', res.message, 'error')
        }
    }

    return (
        <div className="w-main flex justify-center">
            <div className="w-[500px] h-full flex flex-col items-center">
                <h1 className="w-full mb-5 font-semibold text-xl text-[#505050] text-center ">RESET PASSWORD</h1>
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full relative">
                        <input
                            type={changeIconPw ? 'password' : 'text'}
                            placeholder="Password"
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
                        {errors.passwordConfirm && (
                            <i className="text-sm text-red-500">Password confirm is required.</i>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full mb-5 p-[12px_10px] bg-main text-white hover:bg-[#333] transition-colors"
                    >
                        {isLoading ? <Loading size={8} color="white" /> : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
