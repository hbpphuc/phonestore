import React from 'react'
import { ReviewItem } from '../../components'

const ReviewList = ({ data, isNew, onSetIsNew, onSetIsEdit, onSetIsReply }) => {
    return (
        <div className="w-full h-auto flex flex-col">
            {data?.length > 0 ? (
                data
                    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map((item) => (
                        <div key={item._id} className="flex flex-col">
                            <ReviewItem
                                data={item}
                                onSetIsNew={onSetIsNew}
                                onSetIsEdit={onSetIsEdit}
                                onSetIsReply={onSetIsReply}
                            />
                            {item.reply.length > 0 &&
                                item.reply.map((el, index) => (
                                    <div key={index} className="ml-4 sm:ml-8 md:ml-14">
                                        <ReviewItem
                                            data={el}
                                            reviewId={item._id}
                                            reply
                                            onSetIsNew={onSetIsNew}
                                            onSetIsEdit={onSetIsEdit}
                                        />
                                    </div>
                                ))}
                        </div>
                    ))
            ) : (
                <div className="w-full h-auto flex justify-center items-center">
                    <p className="text-sm md:text-base text-primary">This product have no review.</p>
                </div>
            )}
        </div>
    )
}

export default ReviewList
