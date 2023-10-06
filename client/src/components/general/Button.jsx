import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const Button = ({
    type,
    text,
    className,
    active,
    disable,
    to,
    href,
    onClick,
    leftIcon,
    rightIcon,
    children,
    ...passProps
}) => {
    let Compnt = 'button'
    const props = {
        type,
        text,
        className,
        active,
        onClick,
        ...passProps,
    }

    if (to) {
        props.to = to
        Compnt = Link
    } else if (href) {
        props.href = href
        Compnt = 'a'
    }

    return (
        <Compnt className={className} {...props} disabled={disable}>
            {!children ? (
                <>
                    {leftIcon && <span className="icon">{leftIcon}</span>}
                    <span className="title">{text}</span>
                    {rightIcon && <span className="icon">{rightIcon}</span>}
                </>
            ) : (
                children
            )}
        </Compnt>
    )
}

export default forwardRef(Button)
