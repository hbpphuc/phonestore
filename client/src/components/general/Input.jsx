import React from 'react'

const Input = ({
    id,
    label,
    placeHolder,
    type,
    value,
    className,
    register,
    validate,
    errors,
    errmsg,
    user,
    hidden,
    readOnly,
}) => {
    return (
        <div className={`w-full flex ${user ? (hidden ? 'flex-col-reverse' : 'flex-col') : 'items-center'} gap-2`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`w-fit text-base font-medium text-primary cursor-pointer ${hidden && 'hover:underline'}`}
                >
                    {label}
                </label>
            )}
            <div className="flex-1 h-12 flex flex-col">
                <input
                    id={id}
                    placeholder={placeHolder}
                    value={value}
                    readOnly={readOnly}
                    spellCheck={false}
                    type={type || 'text'}
                    className={
                        className
                            ? className
                            : `${
                                  hidden ? 'hidden' : 'flex'
                              } relative w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d] rounded-md`
                    }
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
