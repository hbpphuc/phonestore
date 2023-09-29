import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import * as apis from 'apis'
import { Button, Icon, Paginate, Popup } from 'components'
import { CreateProduct } from 'pages/admin'

const limit = 10

const ManageProducts = () => {
    const { register, handleSubmit } = useForm()

    const { deviceWidth } = useSelector((state) => state.app)

    const [products, setProducts] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

    const [isNew, setIsNew] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [data, setData] = useState(null)
    const [editItem, setEditItem] = useState(null)

    const getAllProduct = async () => {
        const res = await apis.getAllProduct({ page, limit })
        setProducts(res?.data?.data)
        setTotalCount(res?.pagination?.total)
    }

    useEffect(() => {
        getAllProduct()
    }, [page, isNew])

    const onSubmit = async (data) => {
        if (data.name !== '') {
            const res2 = await apis.searchProduct(data.name)
            setProducts(res2?.data?.product)
            setTotalCount(res2?.data?.product.length)
        } else {
            getAllProduct()
        }
    }

    const handleEdit = (id, data) => {
        setEditItem(id)
        setData(data)
        setIsUpdate(true)
    }

    const handleUpdate = async () => {
        setEditItem(null)
        setIsUpdate(false)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete',
            icon: 'warning',
            text: 'This action will delete the product and cannot be restored. Are you sure?',
            showCancelButton: true,
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.deleteProduct(id)
                if (res.status === 'success') {
                    setIsNew(!isNew)
                    toast.success('Delete product successfully!')
                } else {
                    toast.error('Oops! Something went wrong')
                }
            }
        })
    }

    return (
        <div className="w-full h-auto mt-[60px] relative">
            <div className="w-full flex justify-between items-center px-[10px] border-b border-[#999]">
                <h1 className="h-[48px] lg:h-[75px] flex justify-between items-center text-lg md:text-2xl lg:text-3xl font-semibold uppercase">
                    manage product
                </h1>
                <Popup
                    button={
                        <Button
                            onClick={() => {
                                setEditItem(null)
                            }}
                            className="p-3 bg-green-600 font-medium rounded-md"
                        >
                            Create
                        </Button>
                    }
                    styles="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-full"
                >
                    <div className="h-[600px] overflow-y-auto">
                        <CreateProduct id={editItem} pData={data} onUpdate={handleUpdate} />
                    </div>
                </Popup>
            </div>
            <div className="w-full mt-4 px-[10px] flex justify-end items-center">
                <form className="w-[400px] flex gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            placeholder="Search product name..."
                            {...register('name')}
                            className="w-full p-[12px_10px] text-sm bg-[#f6f6f6] border-transparent text-[#1c1d1d]"
                        />
                    </div>
                    <Button type="submit" className="p-[10px] bg-main text-white hover:bg-[#333] transition-colors">
                        <Icon.TbSearch size={24} />
                    </Button>
                </form>
            </div>

            <div className="w-full p-[10px]">
                <table className="table-auto w-full mb-6 text-left border-collapse">
                    <thead className="w-full bg-adminMain text-sm text-white">
                        <tr className="border border-admin">
                            <th className="p-2">#</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Qty</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Brand</th>
                            {deviceWidth >= 1024 && <th className="p-2">Created At</th>}
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full bg-adminMain text-sm text-[#ffffffbf]">
                        {products?.map((item, index) => (
                            <tr key={item._id} className="border border-admin">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">
                                    <img src={item.imageCover} alt={item.name} className="w-10 h-10 object-cover" />
                                </td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">${item.price}</td>
                                <td className="p-2">{item.quantity}</td>
                                <td className="p-2">{item.category.name}</td>
                                <td className="p-2">{item.brand.name}</td>
                                {deviceWidth >= 1024 && (
                                    <td className="p-2">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                )}
                                <td className="flex items-center gap-2 p-2">
                                    <Tippy content="Edit" className="text-base">
                                        {isUpdate && item.id === editItem ? (
                                            <Button
                                                onClick={() => handleUpdate()}
                                                className="p-2 bg-yellow-600 rounded-md hover:brightness-125 transition-all"
                                            >
                                                <Icon.MdDownloadDone size={20} />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleEdit(item.id, item)}
                                                className="p-2 bg-yellow-600 rounded-md hover:brightness-125 transition-all"
                                            >
                                                <Icon.BiSolidEditAlt size={20} />
                                            </Button>
                                        )}
                                    </Tippy>
                                    <Tippy content="Delete" className="text-base">
                                        <Button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 bg-red-600 rounded-md hover:brightness-125 transition-all"
                                        >
                                            <Icon.BiTrash size={20} />
                                        </Button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {totalCount > limit && (
                    <div className="w-full h-auto mt-5 flex justify-center items-end">
                        <Paginate itemCount={totalCount} itemsPerPage={limit} onSetPage={setPage} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ManageProducts
