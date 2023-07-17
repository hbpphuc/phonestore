import React, { useEffect, useState } from 'react'
import * as apis from 'apis'

const Review = ({ id }) => {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const getReviewOnProduct = async () => {
            const res = await apis.getReviewOnProduct(id)
            if (res.status === 'success') setReviews(res?.data?.data)
        }
        getReviewOnProduct()
    }, [])

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
                            <h2 className="text-lg text-secondary font-semibold">{item?.user?.name}</h2>
                            <div>STAR</div>
                            <p className="text-base text-primary">{item?.content}</p>
                            <div>NOTE</div>
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

export default Review
