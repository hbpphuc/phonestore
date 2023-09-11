import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import * as apis from 'apis'
import { ProductItem } from 'components'
import { wishlist } from 'redux/user/userSlice'

const UserWishlist = () => {
    const { isWishlist } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [prods, setProds] = useState(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const getWishlist = async () => {
            setProgress(40)
            const res = await apis.getUserWishlist()
            dispatch(wishlist(true))
            setProds(res?.data?.products)
            setProgress(100)
        }

        getWishlist()
    }, [isWishlist])

    return (
        <div className="w-full h-auto">
            <LoadingBar
                color="#0eb1f2"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={4}
                transitionTime={1000}
            />
            <div className="flex-1 ml-4 mb-2">
                <h1 className="w-full h-auto flex text-xl font-bold uppercase gradient-text">Your Wishlist</h1>
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto flex flex-wrap">
                    {prods?.map((item) => (
                        <div key={item.id} className="w-1/3 h-auto mb-3">
                            <ProductItem data={item} cateType={item.category.slug} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserWishlist
