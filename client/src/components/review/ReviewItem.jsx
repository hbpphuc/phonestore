import React, { useEffect, useState } from 'react'
import * as apis from 'apis'
import moment from 'moment'

const ReviewItem = ({ id, isNew }) => {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const getReviewOnProduct = async () => {
            const res = await apis.getReviewOnProduct(id)
            if (res.status === 'success') setReviews(res?.data?.data)
        }
        getReviewOnProduct()
    }, [isNew])

    const toTimestamp = (strDate) => {
        const datum = Date.parse(strDate)
        return datum / 1000
    }

    // console.log(moment(toTimestamp(reviews[0].createdAt) * 1000).fromNow())

    return (
        <div className="w-full h-auto flex flex-col gap-[30px]">
            {reviews?.length > 0 ? (
                reviews.map((item) => (
                    <div key={item._id} className="w-full h-[100px] flex gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                                src={
                                    item?.user?.photo ||
                                    'https://res.cloudinary.com/dqsmvz7lv/image/upload/v1687345761/Phonestore/qviw1rylnqoqjmeyrucb.jpg'
                                }
                                alt={item?.user?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 h-full flex flex-col">
                            <h2 className="text-lg text-[#32373d] font-semibold">{item?.user?.name}</h2>
                            {/* <div>STAR</div> */}
                            <p className="text-base text-[#444b52] font-medium">{item?.content}</p>
                            <div>
                                {item.createdAt && (
                                    <span className="text-sm font-medium text-[#939ca3]">
                                        {moment(toTimestamp(item.createdAt) * 1000).fromNow()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full h-auto flex justify-center items-center">
                    <p className="text-base text-primary">This product have no review.</p>
                </div>
            )}
        </div>
    )
}

export default ReviewItem
