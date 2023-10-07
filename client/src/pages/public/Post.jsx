import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'
import moment from 'moment/moment'
import { Breadcrumb, Icon } from '../../components'
import * as apis from '../../apis'
import { publicRoutes } from '../../routes/paths'

const Post = () => {
    const { deviceWidth } = useSelector((state) => state.app)

    const { type } = useParams()

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
            type ? setPost(res?.data?.data?.filter((item) => item.topic.slug === type)) : setPost(res?.data?.data)
            setProgress(100)
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
            {deviceWidth >= 768 && (
                <div className="w-full h-auto py-5 bg-[#f7f7f7] flex justify-center items-center">
                    <Breadcrumb />
                </div>
            )}

            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full xl:w-main px-[10px] py-3 md:mb-5 flex items-center gap-5 flex-wrap">
                    {topic?.map((item) => (
                        <NavLink
                            key={item._id}
                            to={`${publicRoutes.post}/${item.slug}`}
                            className={({ isActive }) =>
                                `${
                                    isActive ? 'bg-main text-white border-transparent' : ''
                                } text-[15px] uppercase rounded border border-main p-[4px_8px] md:p-0 md:border-none`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <div className="w-full xl:w-main px-[10px] flex flex-col gap-4 sm:gap-2 md:gap-5">
                    {post?.map((item) => (
                        <div key={item?._id} className={`w-full flex flex-col min-[576px]:flex-row gap-4`}>
                            <div className="w-full min-[576px]:w-[240px] sm:w-[300px]">
                                <img
                                    src={item?.imageCover}
                                    alt={item?.summary}
                                    className={`w-full h-auto object-cover rounded-lg`}
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <Link
                                    to={`/posts/${topic?.find((el) => el._id === item?.topic._id)?.slug}/${item?.slug}`}
                                    className="text-lg sm:text-xl md:text-2xl line-clamp-2 sm:line-clamp-none font-bold font-robotoCondensed hover:text-main cursor-pointer"
                                >
                                    {item?.title}
                                </Link>
                                <div className="flex items-center text-xs text-[#999] my-1 md:my-2">
                                    By {item?.author}
                                    <Icon.BsDot size={16} />
                                    {moment(item?.createdAt).format('MMM DD, YYYY')}
                                </div>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(item?.description),
                                    }}
                                    className="line-clamp-3 sm:line-clamp-4 md:line-clamp-3 xl:line-clamp-5 font-robotoCondensed text-justify text-sm md:text-base"
                                ></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post
