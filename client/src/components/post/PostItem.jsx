import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from 'components/general/Icons'
import moment from 'moment'
import DOMPurify from 'dompurify'

const PostItem = ({ data }) => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full md:mx-2 flex flex-col items-center">
                <img src={data?.imageCover} alt={data?.summary} className="w-full mb-5 object-cover" />
                <Link
                    to={`/posts/${data?.topic?.slug}/${data?.slug}`}
                    className="text-base text-secondary text-center font-semibold mb-[15px] uppercase hover:text-main transition-colors font-robotoCondensed "
                >
                    {data?.title}
                </Link>
                <div className="w-full justify-evenly flex mb-[10px] text-[13px] text-[#8b8b8b]">
                    <span className="flex justify-center gap-2">
                        <Icon.BsCalendar3 size={16} /> {moment(data?.createdAt).format('MMM DD, YYYY')}
                    </span>
                    <div className="flex justify-center items-center gap-4">
                        <span className="flex justify-center gap-1">
                            <Icon.BiLike size={18} /> {data?.likes?.length}
                        </span>
                        <span className="flex justify-center gap-1">
                            <Icon.BiDislike size={18} /> {data?.dislikes?.length}
                        </span>
                    </div>
                </div>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.description),
                    }}
                    className="text-center text-[13px] text-primary leading-[24px] line-clamp-3 font-robotoCondensed"
                ></p>
            </div>
        </div>
    )
}

export default memo(PostItem)
