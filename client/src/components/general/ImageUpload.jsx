import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import Icon from './Icons'

const ImageUpload = ({ id, label, multiple, images, onChangeImages }) => {
    const [isHover, setIsHover] = useState(false)
    const maxNumber = 69

    return (
        <div className="w-full flex flex-col justify-center gap-2">
            {label && (
                <label htmlFor={id} className="w-fit text-base font-medium text-primary cursor-pointer">
                    {label}
                </label>
            )}
            <ImageUploading
                multiple={multiple ? true : false}
                value={images}
                onChange={onChangeImages}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'png', 'jpeg', 'webp']}
            >
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                    <div className="w-full flex gap-2">
                        {multiple ? (
                            <div className="w-full flex flex-wrap gap-2 justify-around">
                                {imageList.map((image, index) => (
                                    <div
                                        key={index}
                                        className="w-[120px] h-[160px] relative border"
                                        onMouseEnter={() => {
                                            setIsHover(true)
                                        }}
                                        onMouseLeave={() => {
                                            setIsHover(false)
                                        }}
                                    >
                                        <img
                                            src={image.data_url}
                                            alt=""
                                            className="w-[120px] h-[160px] object-contain cursor-pointer"
                                        />
                                        {isHover && (
                                            <div className="w-full flex justify-between items-center gap-4 absolute top-0">
                                                <span
                                                    className="p-2 bg-red-600 text-white"
                                                    onClick={() => onImageRemove(index)}
                                                >
                                                    <Icon.CgRemove size={24} />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <span
                                    style={isDragging ? { color: 'red' } : null}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="w-[120px] h-[160px] flex justify-center items-center bg-[#f5f5f5] border-4 border-dashed border-gray-500 cursor-pointer"
                                >
                                    <span className="text-xl text-gray-500 font-semibold text-center">
                                        Click or Drop
                                    </span>
                                </span>
                            </div>
                        ) : (
                            <div className="w-full h-auto">
                                {imageList.length > 0 ? (
                                    imageList.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={image.data_url} alt="" className="w-full h-full object-contain" />
                                            <div className="w-full flex justify-between items-center gap-4 absolute top-0 right-0">
                                                <span
                                                    className="p-2 bg-slate-400 text-white"
                                                    onClick={() => onImageUpdate(index)}
                                                >
                                                    <Icon.RxUpdate size={24} />
                                                </span>
                                                <span
                                                    className="p-2 bg-red-600 text-white"
                                                    onClick={() => onImageRemove(index)}
                                                >
                                                    <Icon.CgRemove size={24} />
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <span
                                        style={isDragging ? { color: 'red' } : null}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                        className="w-full h-[500px] flex justify-center items-center bg-[#f5f5f5] border-4 border-dashed border-gray-500 cursor-pointer"
                                    >
                                        <span className="text-3xl text-gray-500 font-semibold">Click or Drop</span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default ImageUpload
