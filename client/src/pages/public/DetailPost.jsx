import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from 'components'
import * as apis from 'apis'

const DetailPost = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            const res = await apis.getPost(slug)
            setPost(res?.data?.data)
        }
        getPost()
    }, [slug])

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
                        <div className="w-full flex flex-col justify-center items-center absolute bottom-0 mb-10">
                            <h1 className="max-w-[800px] text-5xl text-white font-semibold post-title-font leading-snug">
                                {post?.title}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="max-w-[800px] h-[auto] p-[20px_100px] flex justify-center shadow-[0_0_50px_0_#00000026] -mb-5">
                    <p className="post-description-first-letter post-title-font">{post?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailPost
