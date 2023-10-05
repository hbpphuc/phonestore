import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import * as apis from '../../apis'
import { Button, Icon, Paginate, Popup } from '../../components'
import { CreatePost } from '../../pages/admin'

const limit = 10

const ManagePosts = () => {
    const { deviceWidth } = useSelector((state) => state.app)

    const [posts, setPosts] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    const [page, setPage] = useState(1)

    const [data, setData] = useState(null)
    const [isNew, setIsNew] = useState(false)

    const [editItem, setEditItem] = useState(null)

    const getAllProduct = async () => {
        const res = await apis.getAllPost({ page, limit })
        setPosts(res?.data?.data)
        setTotalCount(res?.pagination?.total)
    }

    useEffect(() => {
        getAllProduct()
    }, [page, isNew])

    const handleEdit = (id, data) => {
        setEditItem(id)
        setData(data)
    }

    const handleUpdate = async () => {
        setEditItem(null)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete',
            icon: 'warning',
            text: 'This action will delete the post and cannot be restore. Are you sure?',
            showCancelButton: true,
            confirmButtonColor: 'red',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.deletePost(id)
                if (res.status === 'success') {
                    setIsNew(!isNew)
                    toast.success('Delete post successfully!')
                } else {
                    toast.error('Oops! Something went wrong')
                }
            }
        })
    }

    return (
        <div className="w-full h-auto mt-[60px] relative">
            <div className="w-full flex justify-between items-center px-[10PX] border-b border-[#999]">
                <h1 className="h-[48px] lg:h-[75px] flex justify-between items-center text-lg md:text-2xl lg:text-3xl font-semibold uppercase">
                    manage posts
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
                    styles="w-[300px] sm:w-[500px] md:w-[700px] lg:w-full"
                >
                    <div className="h-[600px] overflow-y-auto">
                        <CreatePost id={editItem} pData={data} onUpdate={handleUpdate} />
                    </div>
                </Popup>
            </div>

            <div className="w-full p-[10px]">
                <table className="table-auto w-full mb-6 text-left border-collapse">
                    <thead className="w-full bg-adminMain text-sm text-white">
                        <tr className="border border-admin">
                            <th className="p-2">#</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Type</th>
                            {deviceWidth >= 1024 && <th className="p-2">Created At</th>}
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full bg-adminMain text-sm text-[#ffffffbf] align-middle">
                        {posts?.map((item, index) => (
                            <tr key={item._id} className="border border-admin">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">
                                    <img src={item.imageCover} alt={item.summary} className="w-20 h-20 object-cover" />
                                </td>
                                <td className="p-2 font-robotoCondensed">{item.title}</td>
                                <td className="p-2">{item.topic.name}</td>
                                {deviceWidth >= 1024 && (
                                    <td className="p-2">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                )}
                                <td className="h-full flex items-center gap-2 p-2">
                                    <Tippy content="Edit" className="text-base">
                                        <Button
                                            onClick={() => handleEdit(item.id, item)}
                                            className="p-2 bg-yellow-600 rounded-md hover:brightness-125 transition-all"
                                        >
                                            <Icon.BiSolidEditAlt size={20} />
                                        </Button>
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

export default ManagePosts
