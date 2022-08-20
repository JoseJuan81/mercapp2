import React from 'react';

export const PaginaLoadingNewExpense = () => {

    const pulseClass = `
        animate-pulse
        w-full
        rounded
        bg-gray-200
    `
    return (
        <ul className="px-4 pt-4">
            {new Array(5).fill(1).map((i, index) => (
                <li
                    key={index}
                    className={ pulseClass + 'h-12 mb-4' }
                ></li>
            ))}
        </ul>
    )
}
