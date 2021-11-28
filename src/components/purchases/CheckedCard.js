import React from 'react';

import { CheckBox, CheckBoxSelected } from '../Buttons/AppButtons';

export const CheckedCard = React.memo(({ selected, inline = false }) => {
    return (
        <div
            className={`
                absolute ${ inline ? '-top-2 -left-2' : '-top-1 left-0' }
                w-full
                flex items-start ${ inline ? 'justify-start' : 'justify-end' }
                px-1 pt-1
            `}
        >
            {selected
                ? (<CheckBoxSelected
                    isButton
                    className="
                        text-lime-400 text-base
                    "
                />)
                : (<CheckBox
                    isButton
                    className="
                        text-warmGray-300 text-base
                    "
                />)
            }

        </div>
    )
})