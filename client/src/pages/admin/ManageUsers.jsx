import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import Tippy from '@tippyjs/react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import * as apis from '../../apis'
import { Button, Icon, Paginate } from '../../components'

const limit = 10

const ManageUsers = () => {
    const [users, setUsers] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const [isNew, setIsNew] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [role, setRole] = useState(null)

    const roleOpt = [
        { label: 'User', value: 'user' },
        { label: 'Manager', value: 'manager' },
        { label: 'Admin', value: 'admin' },
    ]

    const { register, handleSubmit } = useForm()

    const getAllUser = async (q) => {
        const res = await apis.getAllUser(q, page, limit)
        setUsers(res?.data?.data)
        q === undefined ? setTotalCount(res?.pagination?.total) : setTotalCount(res?.data?.data.length)
    }

    const onSubmit = async (data) => {
        data.q !== '' ? getAllUser(data.q) : getAllUser()
    }

    useEffect(() => {
        getAllUser()
    }, [page, isNew])

    const handleEdit = (id, role) => {
        setIsUpdate(true)
        setEditItem(id)
        setRole(roleOpt.find((item) => item.value === role))
    }

    const handleUpdate = async () => {
        setEditItem(null)
        setIsUpdate(false)
        const res = await apis.updateUser(editItem, { role: role.value })
        if (res.status === 'success') {
            setIsNew(!isNew)
            toast.success('Update user successfully!')
        } else {
            toast.error('Oops! Something went wrong')
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete',
            text: 'Are you sure?',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await apis.deleteUser(id)
                if (res.status === 'success') {
                    setIsNew(!isNew)
                    toast.success('Delete user successfully!')
                } else {
                    toast.error('Oops! Something went wrong')
                }
            }
        })
    }

    return (
        <div className="w-full h-auto mt-[60px]">
            <div className="w-full flex justify-between items-center px-[10px] border-b border-[#999]">
                <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold uppercase">
                    manage user
                </h1>
                <div>
                    <Link className="p-3 bg-red-600 font-medium rounded-md">Delete User</Link>
                </div>
            </div>

            <div className="w-full mt-4 px-[10px] flex justify-end items-center">
                <form className="w-[400px] flex gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            placeholder="Search email or name..."
                            {...register('q')}
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
                            <th className="p-2">Avatar</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Created At</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-full bg-adminMain text-sm text-[#ffffffbf]">
                        {users?.map((item, index) => (
                            <tr key={item._id} className="border border-admin">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">
                                    <img src={item.photo} alt={item.name} className="w-10 h-10 object-cover" />
                                </td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2">
                                    {editItem && item._id === editItem ? (
                                        <Select
                                            value={role}
                                            onChange={setRole}
                                            options={roleOpt}
                                            placeholder="Role"
                                            isSearchable={false}
                                            className="font-semibold text-sm text-primary "
                                        />
                                    ) : (
                                        item.role
                                    )}
                                </td>
                                <td className="p-2">{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                <td className="flex items-center gap-2  p-2">
                                    <Tippy content="Edit" className="text-base">
                                        {isUpdate && item._id === editItem ? (
                                            <Button
                                                onClick={() => handleUpdate()}
                                                className="p-2 bg-yellow-600 rounded-md hover:brightness-125 transition-all"
                                            >
                                                <Icon.MdDownloadDone size={20} />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleEdit(item._id, item.role)}
                                                className="p-2 bg-yellow-600 rounded-md hover:brightness-125 transition-all"
                                            >
                                                <Icon.BiSolidEditAlt size={20} />
                                            </Button>
                                        )}
                                    </Tippy>
                                    <Tippy content="Delete" className="text-base">
                                        <Button
                                            onClick={() => handleDelete(item._id)}
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

export default ManageUsers
