import React from 'react'
import { BeatLoader } from 'react-spinners'

const Loading = ({ color, size }) => {
    return (
        <div className="sweet-loading flex items-center justify-center">
            <BeatLoader color={color} size={size} margin={5} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    )
}

export default Loading
