import { useEffect, useState } from 'react';

import { getPropertysValue, identity, isEmpty, map, some } from 'functionallibrary';

export const useForm = (initialState = {}, requiredFields = []) => {

    const [formState, setFormState] = useState(initialState);
    const [invalidForm, setInvalidForm] = useState(true);

    const handleInputChange = ({ target }) => {

        setFormState({
            ...formState,
            [target.name]: target.value
        })

    }

    const resetForm = () => {

        setFormState(initialState);
    }

    // Validacion de formulario con campos requeridos
    useEffect( () => {

        if ( isEmpty(requiredFields) ) {

            setInvalidForm( false );

        } else {

            const checkingFields = field => isEmpty( getPropertysValue( field, formState ) );
    
            const isFalsy = some(
                identity,
                map( checkingFields, requiredFields )
            );
    
            setInvalidForm( isFalsy );

        }

    }, [formState, requiredFields]);

    return {
        formState,
        handleInputChange,
        resetForm,
        invalidForm
    }
}
