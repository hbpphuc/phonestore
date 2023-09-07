import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import * as apis from 'apis'
import { EditorZone, Input, ImageUpload, Loading } from 'components'

const CreatePost = ({ id, pData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [topic, setTopic] = useState(null)

    const [type, setType] = useState(null)

    const [desc, setDesc] = useState({ description: '' })
    const [invalid, setInvalid] = useState([])

    const [imageCover, setImageCover] = useState([])

    const changeValue = useCallback(
        (e) => {
            setDesc(e)
        },
        [desc]
    )

    useEffect(() => {
        const getAllTopic = async () => {
            const res = await apis.getAllTopic()
            setTopic(res?.data?.data)
        }
        getAllTopic()
    }, [])

    const topicOpt = topic?.map((item) => ({ value: item.slug, label: item.name, id: item._id }))

    const onChangeImageCover = (imageList, addUpdateIndex) => {
        setImageCover(imageList)
    }

    const onSubmit = async (data) => {
        const formData = new FormData()

        if (type?.id === undefined) {
            return toast.error('Topic is require!')
        }

        const newData = {
            ...data,
            topic: type?.id,
            imageCover: imageCover[0]?.file || undefined,
            ...desc,
        }

        for (let i of Object.entries(newData)) {
            formData.append(i[0], i[1])
        }

        setIsLoading(true)
        const res = await apis.createPost(formData)
        setIsLoading(false)
        if (res?.status === 'success') {
            toast.success('Create post successfully!')
            navigate(0)
        } else {
            if (res.message.startsWith('E11000'))
                toast.error('Post title has already exist. Please enter an other title!')
            toast.error(res.message)
        }
    }

    // useEffect(() => {
    //     reset({
    //         name: id ? pData?.name : '',
    //         price: id ? pData?.price : '',
    //         quantity: id ? pData?.quantity : '',
    //         color: id ? pData?.color : '',
    //         cateOpt: id ? { label: pData?.category?.name, value: pData?.category?.slug } : null,
    //         brandOpt: id ? brand : null,
    //     })
    // }, [id])

    return (
        <div className="w-full h-auto mt-5">
            <h1 className="w-full mb-5 font-semibold text-xl text-blue-400 text-center uppercase">create new post</h1>
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="w-full flex items-center mb-3">
                            <Input
                                id="title"
                                label="Title"
                                placeHolder="Enter title"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Title is required."
                            />
                        </div>
                        <div className="w-full flex items-center gap-2 mb-3">
                            <Input
                                id="summary"
                                label="Summary"
                                placeHolder="Enter summary"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Summary is required."
                            />
                            <div className="w-[300px] flex items-center gap-2 text-base font-medium text-primary cursor-pointer z-50">
                                <label htmlFor="topicOpt">Topic</label>
                                <Select
                                    id="topicOpt"
                                    onChange={setType}
                                    options={topicOpt}
                                    placeholder="Choose topic"
                                    isSearchable={false}
                                    className="w-full font-semibold text-sm text-primary"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <EditorZone
                                id="description"
                                label="Description"
                                name="description"
                                changeValue={changeValue}
                                invalid={invalid}
                                setInvalid={setInvalid}
                            />
                        </div>
                    </div>
                    <div className="w-[30%] flex">
                        <div className="w-full flex flex-col items-center gap-2 mb-3">
                            <ImageUpload
                                id="imageCover"
                                label="Upload Image Cover"
                                images={imageCover}
                                onChangeImages={onChangeImageCover}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className={`w-[400px] mt-[30px] bg-main text-white py-2 hover:brightness-95 ${
                        isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    disabled={isLoading ? true : false}
                    type="submit"
                >
                    {isLoading ? <Loading size={8} color="white" /> : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default CreatePost
