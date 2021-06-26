import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [formState, setFormState] = useState(initialState);

    const handleInputChange = ({ target }) => {

        setFormState({
            ...formState,
            [target.name]: target.value
        })

    }

    const resetForm = () => {

        setFormState(initialState);
    }

    return {
        formState,
        handleInputChange,
        resetForm
    }
}
