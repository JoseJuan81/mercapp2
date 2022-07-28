import React, { useEffect, useRef } from 'react';

/**
 * 
 * @param {object} value
 * @property {string} value.label
 */
export const DataList = React.memo(({
    options,
    onChange,
    onBlur,
    value,
    autoFocus,
    propToShow = 'label',
    error,
    ...rest }) => {

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
            className="w-full h-full"
        >
            <input
                { ...rest }
                ref={ ref }
                autoComplete="off"
                className="
                    focus:outline-none
                    input-form
                "
                list={ randomId }
                onChange={ onChange }
                onBlur={ onBlur }
                value={ inputValue }
            />

            { error &&
                <small
                    className="
                        animate__animated animate__slideInRight
                        text-rose-600 font-regular
                        ml-2
                        transform -translate-x-4
                    "
                >{ error } </small>
            }

            <datalist id={ randomId }>

                {options.map((o, i) => (
                    
                    <option value={ o[propToShow] } key={ `${ randomId }-${ i }`} />
                ))}
                
            </datalist>
        </div>
    )
})
