import React, { memo } from 'react'
import Popup from 'reactjs-popup'
import Button from './Button'
import Icon from './Icons'

const PopupWrapper = ({ children, button, title, styles }) => {
    return (
        <Popup trigger={button} modal nested>
            {(close) => (
                <div className={`h-auto flex justify-center items-center p-2 bg-white relative ${styles}`}>
                    <div className="w-10 h-10 absolute top-0 right-0">
                        <Button onClick={close} className="w-full h-full flex justify-center items-center">
                            <Icon.GrClose size={26} />
                        </Button>
                    </div>
                    {title && <div className="header"> Modal Title </div>}
                    <div className="w-full h-full flex justify-center items-center">{children}</div>
                </div>
            )}
        </Popup>
    )
}

export default memo(PopupWrapper)
