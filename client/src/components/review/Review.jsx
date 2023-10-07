import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReviewList from './ReviewList'
import ReviewWriter from './ReviewWriter'
import * as apis from '../../apis'

const Review = () => {
    const { slug } = useParams()

    const [reviews, setReviews] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isReply, setIsReply] = useState(null)
    const [isNewReview, setIsNewReview] = useState(false)

    useEffect(() => {
        const getProduct = async () => {
            const res = await apis.getProductBySlug({ slug })
            setReviews(res?.data?.data)
        }
        getProduct()
    }, [slug, isNewReview])

    return (
        <div className="border border-[#aaa] border-t-0 p-2 md:p-5">
            <ReviewWriter
                id={reviews?._id}
                onSetIsNew={setIsNewReview}
                isEdit={isEdit}
                isReply={isReply}
                onSetIsEdit={setIsEdit}
                onSetIsReply={setIsReply}
            />
            <ReviewList
                data={reviews?.reviews}
                isNew={isEdit}
                onSetIsNew={setIsNewReview}
                onSetIsEdit={setIsEdit}
                onSetIsReply={setIsReply}
            />
        </div>
    )
}

export default Review
