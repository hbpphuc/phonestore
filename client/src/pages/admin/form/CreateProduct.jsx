import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import * as apis from '../../../apis'
import { EditorZone, Input, ImageUpload, Loading, Icon } from '../../../components'

const CreateProduct = ({ id, pData, onUpdate }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [categories, setCategories] = useState(null)

    const [payload, setPayload] = useState({ description: '' })
    const [invalid, setInvalid] = useState([])

    const [cate, setCate] = useState({ label: pData?.category.name, value: pData?.category.slug })
    const [brand, setBrand] = useState({ label: pData?.brand.name, value: pData?.brand.slug })
    const [imageCover, setImageCover] = useState([])
    const [images, setImages] = useState([])
    const [preview, setPreview] = useState('')

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

        if (cate?.id === undefined) {
            return toast.error('Category is require!')
        }

        if (brand?.id === undefined) {
            return toast.error('Brand is require!')
        }

        if (imageCover.length === 0) {
            return toast.error('Image Cover is require!')
        }

        const newData = {
            ...data,
            category: cate?.id,
            brand: brand?.id,
            imageCover: id ? imageCover : imageCover[0].file,
            images: images.map((item) => item.file) || undefined,
            ...payload,
        }

        for (let i of Object.entries(newData)) {
            formData.append(i[0], i[1])
        }

        if (newData.images) {
            for (let image of newData.images) {
                formData.append('images', image)
            }
        }

        let res

        setIsLoading(true)
        if (id) {
            res = await apis.updateProduct(id, formData)
            onUpdate()
        } else res = await apis.createProduct(formData)
        setIsLoading(false)
        if (res?.status === 'success') {
            toast.success(`${id ? 'Update' : 'Create'} product successfully!`)
            navigate(0)
        } else {
            if (res.message.startsWith('E11000'))
                toast.error('Product name has already exist. Please enter an other name!')
            toast.error(res.message)
        }
    }

    useEffect(() => {
        reset({
            name: id ? pData?.name : '',
            price: id ? pData?.price : '',
            quantity: id ? pData?.quantity : '',
            color: id ? pData?.color : '',
        })
    }, [id])

    const handleChange = (e) => {
        setImageCover(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className="w-full h-auto mt-5">
            <h1 className="w-full mb-5 font-semibold text-xl text-blue-400 text-center uppercase">
                {id ? 'update product' : 'create new product'}
            </h1>
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="w-full flex items-center mb-3">
                            <Input
                                id="name"
                                label="Name"
                                placeHolder="Enter name"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Name is required."
                            />
                        </div>
                        <div className="w-full flex items-center gap-2 mb-3">
                            <Input
                                id="price"
                                placeHolder="Enter price"
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
                                placeHolder="Enter quantity"
                                type="number"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Quantity is required."
                            />
                            <Input
                                id="color"
                                label="Color"
                                placeHolder="Enter color"
                                register={register}
                                validate={{ required: true }}
                                errors={errors}
                                errmsg="Color is required."
                            />
                        </div>
                        <div className="w-full flex items-center justify-between gap-2 mb-3 z-40">
                            <div className="flex-1 flex items-center gap-2 text-base font-medium text-primary cursor-pointer">
                                <label htmlFor="cateOpt" className="text-sm md:text-base">
                                    Category
                                </label>
                                <Select
                                    id="cateOpt"
                                    value={id ? cate : undefined}
                                    onChange={setCate}
                                    options={cateOpt}
                                    placeholder="Category"
                                    isSearchable={false}
                                    className="w-full font-semibold text-sm text-primary"
                                />
                            </div>
                            <div className="flex-1 flex items-center justify-end gap-2 text-base font-medium text-primary cursor-pointer">
                                <label htmlFor="brandOpt" className="text-sm md:text-base">
                                    Brand
                                </label>
                                <Select
                                    id="brandOpt"
                                    value={id ? brand : undefined}
                                    onChange={setBrand}
                                    options={brandOpt}
                                    placeholder="Brand"
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
                                value={id ? pData?.description : ''}
                                changeValue={changeValue}
                                invalid={invalid}
                                setInvalid={setInvalid}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-[35%] flex">
                        <div className="w-full flex lg:flex-col lg:items-center gap-4 lg:gap-2 mb-3">
                            <div className="w-1/2 lg:w-full">
                                {id ? (
                                    <div className="relative">
                                        <img
                                            src={preview || pData?.imageCover}
                                            alt={pData?.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="w-full flex justify-between items-center gap-4 absolute top-0 right-0">
                                            <label
                                                htmlFor="updateImg"
                                                className="p-2 bg-slate-400 text-white cursor-pointer"
                                            >
                                                <Icon.RxUpdate size={24} />
                                            </label>
                                            <div className="w-full flex flex-col-reverse items-center gap-2">
                                                <input
                                                    id="updateImg"
                                                    type="file"
                                                    {...register('imageCover')}
                                                    onChange={handleChange}
                                                    hidden
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <ImageUpload
                                        id="imageCover"
                                        label="Upload Image Cover"
                                        images={imageCover}
                                        onChangeImages={onChangeImageCover}
                                    />
                                )}
                            </div>
                            <div className="w-1/2 lg:w-full">
                                <ImageUpload
                                    id="images"
                                    label="Upload Images"
                                    images={!id ? images : pData?.images}
                                    isEdit={id ? true : false}
                                    onChangeImages={onChangeImages}
                                    multiple
                                />
                            </div>
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
                    {isLoading ? <Loading size={8} color="white" /> : id ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default CreateProduct
