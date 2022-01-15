import React from 'react'

export const Descriptor = ({ data, label, userClass }) => {
    return (
        <div
            className={`
                animate__animated animate__bounceInLeft
                ${ userClass }
                font-bold text-warmGray-600 text-xl
                mb-1
            `}
        >
            <span
                className="
                    text-base text-warmGray-400 font-medium
                    mr-3
                "
            >{ label }</span>
            { data }
        </div>
    )
}
