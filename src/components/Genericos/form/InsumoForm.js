import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { compose, isEmpty, isNotEmpty, setNewProperty } from 'functionallibrary';
import PropType from 'prop-types';

import { useForm } from '../../../hooks/useForm';

import { InsumoContext } from '../../../context/Insumo/InsumoContext';
import { LabelsField } from './LabelsField';
import { useIndexDB } from '../../../hooks/useIndexDB';

const defaultInsumoForm = {
    labels: [],
    title: '',
    price: 0
}

/**
 * 
 * @param {function} closeModal - funcion para cerrar modal
 * @param {function} saveData - funcion para guardar nuevo insumo
 */
export const InsumoForm = ({ closeModal }) => {

    const nameInput = useRef(null);

    const { setNewInsumoInLocalDB, updateInsumoInLocalDB } = useIndexDB();

    const { addingNewInsumo, insumoToUpdate, updatingInsumoInContext } = useContext( InsumoContext );

    const [isUpdating] = useState( isNotEmpty( insumoToUpdate ) );

    const initInsumo = isUpdating ? insumoToUpdate : defaultInsumoForm;

    const { formState, handleInputChange, invalidForm } = useForm(initInsumo, ['title']);


    const createInsumo = async () => {
        const setCurrency = setNewProperty( 'currency', 'S/.' );
        const setId = setNewProperty( 'id', Math.random().toString(16).slice(2) );
        const setQuantity = setNewProperty( 'quantity', 1 );
        const setPriceInNumber = setNewProperty('price', Number(formState.price));

        const parsedInsumo = compose( setCurrency, setId, setQuantity, setPriceInNumber )(formState);

        addingNewInsumo( parsedInsumo );
        await setNewInsumoInLocalDB( parsedInsumo );
    }

    const updateInsumo = async () => {
        updatingInsumoInContext( formState );
        await updateInsumoInLocalDB( formState );
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        if ( isUpdating ) {

            updateInsumo();
        } else {

            createInsumo();
        }

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