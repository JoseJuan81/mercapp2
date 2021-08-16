import React from 'react';

export const InputField = React.memo(({
    error,
    onBlur,
    onChange,
    value,
    ...rest
}) => {
    return (
        <>
            <input
                { ...rest }
                className="input-form"
                value={ value }
                onChange={ onChange }
                onBlur={ onBlur }
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
