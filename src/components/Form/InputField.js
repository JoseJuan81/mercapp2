import React, { useRef } from 'react';

import PropTypes from 'prop-types';

export const InputField = React.memo(({
    error,
    onBlur,
    onChange,
    onFocus,
    value,
    specialClass,
    autoSelectOnFocus,
    ...rest
}) => {
    const className = specialClass ? `input-form ${specialClass}` : 'input-form';

    const ref = useRef();

    const localFocus = ( e ) => {

        if ( autoSelectOnFocus ) {
            ref.current.select();
        }

        if ( typeof onFocus === 'function' ) {

            onFocus( e );
        }

    }

    return (
        <>
            <input
                { ...rest }
                ref={ ref }
                className={ className }
                value={ value }
                onChange={ onChange }
                onBlur={ onBlur }
                onFocus={ localFocus }
            />

            { error &&
                <small
                    className="
                        animate__animated animate__slideInRight
                        text-rose-600 font-regular
                        ml-2
                    "
                >{ error } </small>
            }   
        </>
    )
})

InputField.propTypes = {
    error: PropTypes.string,
    value: PropTypes.any,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
}
