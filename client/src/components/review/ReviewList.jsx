import React from 'react'
import { ReviewItem } from 'components'

const ReviewList = ({ data, isNew, onSetIsNew, onSetIsEdit, onSetIsReply }) => {
    return (
        <div className="w-full h-auto flex flex-col">
            {data?.length > 0 ? (
                data
                    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map((item) => (
                        <div className="flex flex-col">
                            <ReviewItem
                                key={item._id}
                                data={item}
                                onSetIsNew={onSetIsNew}
                                onSetIsEdit={onSetIsEdit}
                                onSetIsReply={onSetIsReply}
                            />
                            {item.reply.length > 0 &&
                                item.reply.map((el, index) => (
                                    <div className="ml-14">
                                        <ReviewItem
                                            key={index}
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
                    <p className="text-base text-primary">This product have no review.</p>
                </div>
            )}
        </div>
    )
}

export default ReviewList
