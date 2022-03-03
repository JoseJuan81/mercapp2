import React from 'react'
import { CheckBox, CheckBoxSelected } from './AppButtons'

export const CheckBoxButton = React.memo(({ checked = false, onCheck }) => {
    return (
        <div
            className={`
                w-full
                flex items-start justify-center }
                px-1 pt-1
            `}
        >
            {checked
                ? (<CheckBoxSelected
                    isButton
                    className="
                        text-lime-400 text-base
                    "
                    onClick={ () => onCheck( false )}
                    />)
                    : (<CheckBox
                    isButton
                    className="
                        text-warmGray-300 text-base
                    "
                    onClick={ () => onCheck( true )}
                />)
            }

        </div>
    )
})
