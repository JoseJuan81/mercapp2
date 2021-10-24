import React, { useEffect, useRef } from 'react';

/**
 * 
 * @param {object} value
 * @property {string} value.label
 */
export const DataList = React.memo(({ options, onChange, onBlur, value, autoFocus, ...rest }) => {
console.log('Datalist')
    const ref = useRef();

    const randomId = Math.random().toString( 32 ).split('.')[1];

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
                value={ value.label }
            />
            <datalist id={ randomId }>

                {options.map((o, i) => (
                    
                    <option value={ o.label } key={ `${ randomId }-${ i }`} />
                ))}
                
            </datalist>
        </div>
    )
})
