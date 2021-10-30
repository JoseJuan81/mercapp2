import React from 'react';

import { InputField } from '../Form/InputField';

export const InsumoPrice = React.memo( ({ currency = 'PEN', price }) => {

    return (
        <dt
            className="
                text-2xl text-warmGray-500
                font-light
                mx-2
                relative
            "
        >
            <div
                className="
                    text-xs
                    absolute top-0 left-0
                    flex items-end justify-center
                    w-10 h-full
                    pb-3
                "
            >
                <span>{ currency }</span>
            </div>
            <InputField
                specialClass="input-transparent pl-10"
                value={ price }
                onChange={ () => {} }
            />
        </dt>
    )
})