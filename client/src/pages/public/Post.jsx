import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import moment from 'moment/moment'
import { Breadcrumb, Icon } from 'components'
import * as apis from 'apis'
import { publicRoutes } from 'routes/paths'
import LoadingBar from 'react-top-loading-bar'

const Post = () => {
    const { type } = useParams()

    console.log({ type })

    const [topic, setTopic] = useState(null)
    const [post, setPost] = useState(null)

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const getAllTopic = async () => {
            const res = await apis.getAllTopic()
            setTopic(res?.data?.data)
        }

        getAllTopic()
    }, [])

    useEffect(() => {
        const getAllPost = async () => {
            setProgress(30)
            const res = await apis.getAllPost()
            setProgress(100)

            if (!type) setPost(res?.data?.data)
            else {
                const typePost = topic?.find((el) => el.slug === type)
                setPost(res?.data?.data?.filter((item) => item.topic === typePost?._id))
            }
        }

        getAllPost()
    }, [type])

    return (
        <div className="w-full h-auto flex justify-center items-center flex-col">
            <LoadingBar
                color="#0eb1f2"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
                transitionTime={1000}
            />
            <div className="w-full h-auto py-5 bg-[#f7f7f7] flex justify-center items-center">
                <Breadcrumb />
            </div>
            <div className="w-main h-auto py-5 mb-5 flex items-center">
                {topic?.map((item) => (
                    <NavLink
                        key={item._id}
                        to={`${publicRoutes.post}/${item.slug}`}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-main text-white' : ''} mr-5 text-[15px] uppercase rounded p-[2px_10px]`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
            <div className="w-main grid grid-cols-4 gap-6">
                {post?.map((item) => (
                    <div key={item?._id} className={`w-full col-start-1 col-span-3 flex gap-4`}>
                        <img
                            src={item?.imageCover}
                            alt={item?.summary}
                            className={`w-[300px] h-auto object-cover rounded-lg`}
                        />
                        <div className="">
                            <Link
                                to={`/posts/${topic?.find((el) => el._id === item?.topic)?.slug}/${item?.slug}`}
                                className="text-2xl font-bold font-robotoCondensed hover:text-main cursor-pointer"
                            >
                                {item?.title}
                            </Link>
                            <div className="flex items-center text-xs text-[#999] my-2">
                                By {item?.author}
                                <Icon.BsDot size={16} />
                                {moment(item?.createdAt).format('MMM DD, YYYY')}
                            </div>
                            <p className="line-clamp-5 font-robotoCondensed text-justify">{item?.description}</p>
                        </div>
                    </div>
                ))}
                <div className="col-start-4 col-span-1 row-start-1">
                    <img src="https://cdn.tgdd.vn/2023/08/banner/380x215-380x215.png" alt="ads" />
                </div>
            </div>
        </div>
    )
}

export default Post
