import React from 'react';

export const LockedBuyIcon = React.memo(({ closed, selected }) => {

    let iconColors = selected ? 'text-lime-400' : 'text-warmGray-300';
    iconColors = closed ? 'text-warmGray-600' : iconColors;

    return (
        <div
            className={`
                ${ iconColors } text-3xl
                flex items-center justify-center
            `}
        >
            {closed
                ? <i className="fas fa-lock"></i>
                : <i className="fas fa-lock-open"></i>
            }
        </div>
    )
})