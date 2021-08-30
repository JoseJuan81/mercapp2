import React from 'react';

import { InputField } from './InputField';

export const InsumoPrice = ({ name, price, onChange }) => {

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
            type="number"
            placeholder="precio"
            name="value"
            specialClass="w-20"
            value={ price }
            onChange={ handleOnChange }
        />
        </div>
    )
}
