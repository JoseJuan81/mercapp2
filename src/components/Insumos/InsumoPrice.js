import React from 'react';

import { InputField } from '../Form/InputField';

export const InsumoPrice = React.memo( ({ currency = 'PEN', price, onChange, onBlur, id }) => {

    const onFocusSelectAll = () => {
        const input = document.querySelector('[data-input-price="' + id + '"]');
        input.select();
    }

    return (
        <dt
            className="
                text-lg text-warmGray-600
                font-light
                ml-2
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
                type="number"
                data-input-price={ id }
                specialClass="input-transparent pl-10"
                value={ price }
                onChange={ onChange }
                onFocus={ onFocusSelectAll }
                onBlur={ onBlur }
            />
        </dt>
    )
})