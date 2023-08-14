import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { toast } from 'react-toastify'
import * as apis from 'apis'
import { EditorZone, Input, ImageUpload } from 'components'
import { useCallback } from 'react'

const CreateProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [categories, setCategories] = useState(null)

    const [payload, setPayload] = useState({ description: '' })
    const [invalid, setInvalid] = useState([])

    const [cate, setCate] = useState(null)
    const [brand, setBrand] = useState(null)
    const [imageCover, setImageCover] = useState([])
    const [images, setImages] = useState([])

    const changeValue = useCallback(
        (e) => {
            setPayload(e)
        },
        [payload]
    )

    useEffect(() => {
        const getAllCategory = async () => {
            const res = await apis.getAllCategory()
            setCategories(res?.data?.data)
        }
        getAllCategory()
    }, [])

    const cateOpt = categories?.map((item) => ({ value: item.slug, label: item.name, id: item.id }))
    const brandOpt = categories
        ?.find((item) => item.id === cate?.id)
        ?.brands.map((el) => ({ value: el.slug, label: el.name, id: el.id }))

    const onChangeImageCover = (imageList, addUpdateIndex) => {
        setImageCover(imageList)
    }

    const onChangeImages = (imageList, addUpdateIndex) => {
        setImages(imageList)
    }

    const onSubmit = async (data) => {
        const formData = new FormData()

        const newData = {
            ...data,
            category: cate?.id || undefined,
            brand: brand?.id || undefined,
            imageCover,
            ...images,
            ...payload,
        }

        if (newData.category === undefined) {
            return toast.error('Category is required!')
        }

        if (newData.brand === undefined) {
            return toast.error('Brand is required!')
        }

        for (let i of Object.entries(newData)) formData.append(i[0], i[1])

        if (newData.imageCover) formData.append('imageCover', imageCover[0].file)

        const res = await apis.createProduct(formData)
        console.log(res)
    }

    return (
        <div className="w-full h-auto mt-5">
            <h1 className="w-full mb-5 font-semibold text-xl text-blue-400 text-center uppercase">
                create new product
            </h1>
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="w-full flex items-center mb-3">
                            <Input
                                id="name"
                                label="Name"
                                placeHolder="Enter name..."
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Name is required."
                            />
                        </div>
                        <div className="w-full flex items-center gap-2 mb-3">
                            <Input
                                id="price"
                                label="Price"
                                type="number"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Price is required."
                            />
                            <Input
                                id="quantity"
                                label="Quantity"
                                type="number"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Quantity is required."
                            />
                            <Input
                                id="color"
                                label="Color"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Color is required."
                            />
                        </div>
                        <div className="w-full flex items-center justify-between gap-2 mb-3 z-40">
                            <div className="flex-1 flex items-center gap-2 text-base font-medium text-primary cursor-pointer">
                                <label htmlFor="cateOpt">Category</label>
                                <Select
                                    id="cateOpt"
                                    value={cate}
                                    onChange={setCate}
                                    options={cateOpt}
                                    placeholder="Choose Category"
                                    isSearchable={false}
                                    className="w-full font-semibold text-sm text-primary"
                                />
                            </div>
                            <div className="flex-1 flex items-center justify-end gap-2 text-base font-medium text-primary cursor-pointer">
                                <label htmlFor="brandOpt">Brand</label>
                                <Select
                                    id="brandOpt"
                                    value={brand}
                                    onChange={setBrand}
                                    options={brandOpt}
                                    placeholder="Choose Brand"
                                    isSearchable={false}
                                    className="w-full font-semibold text-sm text-primary"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <EditorZone
                                label="Description"
                                id="description"
                                name="description"
                                changeValue={changeValue}
                                invalid={invalid}
                                setInvalid={setInvalid}
                            />
                        </div>
                    </div>
                    <div className="w-[35%] flex">
                        <div className="w-full flex flex-col items-center gap-2 mb-3">
                            <ImageUpload
                                id="imageCover"
                                label="Upload Image Cover"
                                images={imageCover}
                                onChangeImages={onChangeImageCover}
                            />
                            <ImageUpload
                                id="images"
                                label="Upload Images"
                                images={images}
                                onChangeImages={onChangeImages}
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <button className="w-[400px] mt-[30px] bg-main text-white py-2 hover:brightness-95" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateProduct
