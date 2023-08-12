import React from 'react'

const Input = ({ id, label, placeHolder, type, register, validate, errors, errmsg, multiple }) => {
    return (
        <div className="w-full flex items-center gap-2">
            {label && (
                <label htmlFor={id} className="w-fit text-base font-medium text-primary cursor-pointer">
                    {label}
                </label>
            )}
            <div className="flex-1 h-12 flex flex-col">
                <input
                    id={id}
                    placeholder={placeHolder}
                    type={type || 'text'}
                    multiple={multiple ? true : false}
                    className={`w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]`}
                    {...register(id, validate)}
                />
                {errors[id] && (
                    <span>
                        <i className="text-sm text-red-500">{errmsg}</i>
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input
