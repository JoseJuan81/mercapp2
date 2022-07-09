import React, { useEffect, useRef } from 'react';

/**
 * 
 * @param {object} value
 * @property {string} value.label
 */
export const DataList = React.memo(({ options, onChange, onBlur, value, autoFocus, ...rest }) => {

    const ref = useRef();

    const randomId = Math.random().toString( 32 ).split('.')[1];

    let inputValue = value && !value.label ? value : '';
    inputValue = value && value.label && typeof value.label === 'string' ? value.label : inputValue;

    useEffect( () => {

        if ( autoFocus ) {
            ref.current.focus();
        }

    }, [])

    return (
        <div
            className="input-form"
        >
            <input
                { ...rest }
                ref={ ref }
                autoComplete="off"
                className="
                    w-full h-full
                    focus:outline-none
                "
                list={ randomId }
                onChange={ onChange }
                onBlur={ onBlur }
                value={ inputValue }
            />
            <datalist id={ randomId }>

                {options.map((o, i) => (
                    
                    <option value={ o.label } key={ `${ randomId }-${ i }`} />
                ))}
                
            </datalist>
        </div>
    )
})
