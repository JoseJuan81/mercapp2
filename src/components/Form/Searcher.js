import React, { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'functionallibrary';

export const Searcher = ({ onSearch, placeholder }) => {

    const [formState, setFormState] = useState({
        search: ''
    });

    const inputRef = useRef();

    const handleFormSubmit = (ev) => {
        ev.preventDefault();

        onSearch(formState.search.trim());

        inputRef.current.select();
    }

    const handleInputChange = ({ target }) => {

        setFormState({
            ...formState,
            [target.name]: target.value
        });

        if (isEmpty(target.value)) {

            onSearch( target.value );

        } else {
            onSearch( target.value.trim() );
        }
    }

    useEffect(() => {

        inputRef.current.focus();

    }, [])

    return (
        <form
            className="h-12 flex-auto"
            onSubmit={ handleFormSubmit }
        >
            <input
                className="
                    h-full w-full
                    rounded
                    border border-solid border-warmGray-300
                    px-2
                "
                ref={ inputRef }
                type="search"
                autoComplete="off"
                placeholder={ placeholder }
                name="search"
                onChange={ handleInputChange }
                value={ formState.search }
            />
        </form>
    )
}
