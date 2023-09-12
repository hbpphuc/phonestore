import React from 'react'
import { BeatLoader } from 'react-spinners'

const Loading = ({ type, color, size, className }) => {
    const Loader = type ? type : BeatLoader
    return (
        <div className="sweet-loading flex items-center justify-center">
            <Loader
                color={color}
                size={size}
                margin={5}
                aria-label="Loading Spinner"
                data-testid="loader"
                className={className}
            />
        </div>
    )
}

export default Loading
