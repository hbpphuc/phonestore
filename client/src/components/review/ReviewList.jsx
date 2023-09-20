import React from 'react'
import { ReviewItem } from 'components'

const ReviewList = ({ data, isNew, onSetIsNew, onSetIsEdit }) => {
    console.log(data)
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
                                isNew={isNew}
                                onSetIsNew={onSetIsNew}
                                onSetIsEdit={onSetIsEdit}
                            />
                            {item.reply.length > 0 &&
                                item.reply.map((el) => (
                                    <div className="ml-14">
                                        <ReviewItem
                                            key={el._id}
                                            data={el}
                                            reply
                                            isNew={isNew}
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
