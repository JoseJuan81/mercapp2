import React, { useContext, useLayoutEffect, useRef } from 'react'
import { useForm } from '../../../hooks/useForm';

import PropType from 'prop-types';
import { compose, setNewProperty } from 'functionallibrary';
import { InsumoContext } from '../../../context/InsumoContext';
import { LabelsField } from './LabelsField';

/**
 * 
 * @param {function} closeModal - funcion para cerrar modal
 * @param {function} saveData - funcion para guardar nuevo insumo
 */
export const InsumoForm = ({ closeModal }) => {

    const { addingNewInsumo } = useContext( InsumoContext );

    const nameInput = useRef(null);

    const { formState, handleInputChange, invalidForm } = useForm({
        labels: [],
        title: '',
        price: 0
    }, ['title']);

    const handleSubmit = (ev) => {
        ev.preventDefault();

        const setCurrency = setNewProperty( 'currency', 'S/.' );
        const setId = setNewProperty( 'id', Math.random().toString(16).slice(2) );
        const setQuantity = setNewProperty( 'quantity', 1 );
        const setPriceInNumber = setNewProperty('price', Number(formState.price));

        const parsedInsumo = compose( setCurrency, setId, setQuantity, setPriceInNumber )(formState);

        addingNewInsumo( parsedInsumo );

        closeModal();
    };

    useLayoutEffect( () => {

        nameInput.current.focus();

    }, []);

    return (
        <>
        <h1
            className="
                text-2xl font-normal text-warmGray-500
                pt-2 mb-4
            "
        >Agregar nuevo insumo</h1>

        <form
            className="
                pt-4 pb-20
                flex flex-col
                relative
                w-full h-full
            "
            onSubmit={ handleSubmit }
        >

            <input
                autoComplete="off"
                ref={ nameInput }
                className="
                    w-full h-16
                    pl-2 mb-4
                    border border-solid border-warmGray-300
                    rounded
                "
                placeholder="Nombre"
                name="title"
                value={ formState.title }
                onChange={ handleInputChange }
            />

            <input
                autoComplete="off"
                className="
                    w-full h-16
                    pl-2 mb-4
                    border border-solid border-warmGray-300
                    rounded
                "
                type="number"
                placeholder="Precio"
                name="price"
                value={ formState.price }
                onChange={ handleInputChange }
            />

            <LabelsField
                labels={ formState.labels }
                addLabels={ handleInputChange }
            />

            <div
                className="
                    absolute bottom-0 left-0
                    w-full
                    py-2
                    flex items-center justify-center
                "
            >
                <button
                    className="
                        flex-auto
                        py-4 px-2 mr-2
                        bg-rose-300
                        text-rose-800 font-bold
                    "
                    type="button"
                    onClick={ closeModal }
                >Cancelar</button>
                <button
                    disabled={ invalidForm }
                    className={`
                        flex-auto
                        py-4 px-2 ml-2
                        bg-lime-400
                        text-lime-800 font-bold
                        ${invalidForm && 'opacity-30'}
                    `}
                >Guardar</button>
            </div>

        </form>
        </>
    )
}

InsumoForm.propType = {
    closeModal: PropType.func.isRequired,
    saveData: PropType.func.isRequired,
}