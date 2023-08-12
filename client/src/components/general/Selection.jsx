import React from 'react'

const Selection = ({ id, label, options = [], defaultValue, register, validate, errors, errmsg }) => {
    return (
        <div className="flex-1 flex items-center gap-2">
            {label && (
                <label htmlFor={id} className="w-fit text-base font-medium text-primary cursor-pointer">
                    {label}
                </label>
            )}
            <div className="flex-1 h-12 flex flex-col">
                <select
                    id={id}
                    defaultValue={defaultValue}
                    className={`w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]`}
                    {...register(id, validate)}
                >
                    <option value="">{label}</option>
                    {options?.map((item) => (
                        <option value={item.value}>{item.label}</option>
                    ))}
                </select>
                {errors[id] && <i className="text-sm text-red-500">{errmsg}</i>}
            </div>
        </div>
    )
}

export default Selection
