import React from 'react'
import { BeatLoader, FadeLoader } from 'react-spinners'

const Loading = ({ type, color, size }) => {
    const Loader = type ? type : BeatLoader
    return (
        <div className="sweet-loading flex items-center justify-center">
            <Loader color={color} size={size} margin={5} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    )
}

export default Loading
