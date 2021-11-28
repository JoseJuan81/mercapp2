import React from 'react';

import { getDayInWord, getFormatDate } from '../../helper/dates';

export const BuyDate = React.memo(({ date, inline = false, selected }) => {
    return (
        <div
            className={`
                flex ${ inline ? 'flex-row' : 'flex-col' } items-end justify-center
                ${ selected ? 'text-warmGray-800' : 'text-warmGray-500' } text-sm
            `}
        >
            <span
                className=""
            >{ getDayInWord( date )}
            </span> 
            <span
                className="ml-2"
            >{ getFormatDate( date ) }
            </span>
        </div>
    )
})