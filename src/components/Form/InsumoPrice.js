import React from 'react';

import { InputField } from './InputField';

export const InsumoPrice = ({
    name,
    price,
    onChange,
    addNewPrice,
    removePrice,
    showAddPrice,
}) => {

    const handleOnChange = ({ target }) => {

        const isName = target.name === 'name';
        const isValue = target.name === 'value';

        const priceValue = { name, value: price };
        
        if ( isName ) {
            priceValue.name = target.value;
        }

        if ( isValue ) {
            priceValue.value = Number( target.value );
        }

        onChange({
            target: {
                name: 'price',
                value: priceValue
            }
        })

    }

    return (
        <div
            className="
                flex items-center
            "
        >
            <InputField
                autoComplete="off"
                type="text"
                placeholder="establecimiento"
                name="name"
                specialClass="flex-auto mr-4"
                value={ name }
                onChange={ handleOnChange }
            />
            <InputField
                autoComplete="off"
                type="number"
                placeholder="precio"
                name="value"
                specialClass="w-20"
                value={ price }
                onChange={ handleOnChange }
            />

            {showAddPrice ?
                <button
                    type="button"
                    className="
                        icon-plus
                        py-2 px-3 ml-4
                        text-warmGray-800 text-2xl
                        bg-warmGray-100
                    "
                    onClick={ addNewPrice }
                ></button>
                :
                <button
                    type="button"
                    className="
                        icon-minus
                        py-2 px-3 ml-4
                        text-warmGray-800 text-2xl
                        bg-warmGray-100
                    "
                    onClick={ removePrice }
                ></button>
            }
        </div>
    )
}
