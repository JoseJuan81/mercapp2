import React from 'react';

import PropTypes from 'prop-types';

export const InputField = React.memo(({
    error,
    onBlur,
    onChange,
    onFocus,
    value,
    specialClass,
    ...rest
}) => {
    const className = specialClass ? `input-form ${specialClass}` : 'input-form';

    return (
        <>
            <input
                { ...rest }
                className={ className }
                value={ value }
                onChange={ onChange }
                onBlur={ onBlur }
                onFocus={ onFocus }
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
