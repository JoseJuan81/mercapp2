import React from 'react'

export const PaginaLoading = () => {
    return (
        <div
            className="
                h-full w-full
                flex flex-col items-center justify-center
            "
        >
            <span
                className="
                    flex items-center justify-center
                    h-12 w-12
                    relative
                "
            >
                <span
                    className="
                        animate-ping
                        absolute inline-flex h-full w-full
                        rounded-full
                        bg-lime-400
                        opacity-75
                    "
                ></span>
                <span
                    className="
                        relative inline-flex
                        rounded-full
                        h-3 w-3
                        bg-lime-500
                    "
                ></span>
            </span>
        </div>
    )
}
