import React, { memo } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Icon from './Icons'
import useModal from '../hooks/useModal'
import Popup from './Popup'

const ProdAction = ({ data }) => {
    const { isShowing, toggle } = useModal()

    return (
        <div className="product-item-options w-full h-10 flex justify-center items-center gap-3 relative -bottom-16">
            <Tippy content={'Detail'} placement="top">
                <button className="w-11 h-11 flex justify-center items-center rounded-full product-action">
                    <Icon.HiMenu />
                </button>
            </Tippy>
            <Tippy content={'Wishlist'} placement="top">
                <button className="w-11 h-11 flex justify-center items-center rounded-full product-action">
                    <Icon.FaHeart />
                </button>
            </Tippy>
            <Tippy content={'Quick View'} placement="top">
                <button
                    onClick={toggle}
                    className="w-11 h-11 flex justify-center items-center rounded-full product-action"
                >
                    <Icon.FaEye />
                </button>
            </Tippy>
            {isShowing && <Popup modalIsOpen={isShowing} closeModal={toggle} data={data} />}
        </div>
    )
}

export default memo(ProdAction)
