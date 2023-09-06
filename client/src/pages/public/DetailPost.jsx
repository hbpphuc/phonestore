import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DOMPurify from 'dompurify'
import { Breadcrumb, Icon } from 'components'
import * as apis from 'apis'
import moment from 'moment'
import { toTimestamp } from 'utils/helper'
import { useSelector } from 'react-redux'

const DetailPost = () => {
    const { slug } = useParams()
    const { curUser } = useSelector((state) => state.user)

    const [react, setReact] = useState(false)

    const [post, setPost] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            const res = await apis.getPost(slug)
            setPost(res?.data?.data)
        }
        getPost()
    }, [slug, react])

    const handleLikePost = async () => {
        const res = await apis.likePost(post?._id)
        if (res?.status !== 'success') toast.error(res?.message)
        setReact((prev) => !prev)
    }

    const handleDislikePost = async () => {
        const res = await apis.dislikePost(post?._id)
        if (res?.status !== 'success') toast.error(res?.message)
        setReact((prev) => !prev)
    }

    return (
        <div className="w-full h-auto">
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto py-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb title={post?.summary} />
                </div>
                <div className="w-full h-auto flex justify-center bg-slate-200 relative">
                    <div className={`w-full h-[450px] bg-no-repeat bg-[center_center] bg-cover`}>
                        <img src={post?.imageCover} alt={post?.summary} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-[#ffffff00] via-[#00000099] to-[#000000cc] z-50">
                        <div className="w-full flex flex-col justify-center items-center absolute bottom-0 mb-5">
                            <h1 className="max-w-[800px] text-5xl text-white font-semibold font-robotoCondensed leading-snug">
                                {post?.title}
                            </h1>
                            <div className="w-[800px] flex justify-between items-center">
                                <div className="flex items-center text-sm text-[#999]">
                                    By
                                    <span className="ml-1 text-main font-medium">{post?.author}</span>
                                    <Icon.BsDot size={16} />
                                    {moment(toTimestamp(post?.createdAt) * 1000).fromNow()}
                                </div>
                                <div className="flex gap-2 text-white">
                                    <span
                                        onClick={handleLikePost}
                                        className="p-2 cursor-pointer active:animate-like-effect"
                                    >
                                        {post?.likes?.find((item) => curUser?.data?._id === item) ? (
                                            <Icon.BiSolidLike size={24} />
                                        ) : (
                                            <Icon.BiLike size={24} />
                                        )}
                                    </span>
                                    <span
                                        onClick={handleDislikePost}
                                        className="p-2 cursor-pointer active:animate-like-effect"
                                    >
                                        {post?.dislikes?.find((item) => curUser?.data?._id === item) ? (
                                            <Icon.BiSolidDislike size={24} />
                                        ) : (
                                            <Icon.BiDislike size={24} />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[800px] h-[auto] p-[20px_100px] flex justify-center shadow-[0_0_50px_0_#00000026] -mb-5">
                    <p
                        className="font-robotoCondensed"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post?.description),
                        }}
                    ></p>
                </div>
            </div>
        </div>
    )
}

export default DetailPost
