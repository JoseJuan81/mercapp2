import { equality, find, isEmpty } from 'functionallibrary';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startDeletingInsumos } from '../actions/insumosAction';

import { BaseButton } from '../components/Buttons/AppButtons';
import { InsumoBase } from '../components/Insumos/Insumo';
import { SearchAndFilterComponent } from '../components/Insumos/SearchAndFilterComponent';
import { BottomModal } from '../components/Modal/BottomModal';

export const PaginaInsumos = ({ insumos }) => {

    // ===== STORE =====
    const {
        search: { isFiltering, isSearching}
    } = useSelector( store => store );
    const dispatch = useDispatch();

    // ===== STATE =====
    const [showDeleteModal, setShowDeleteModal] = useState( false );
    const [insumoName, setInsumoName] = useState( '' );
    const [insumoId, setInsumoId] = useState( '' );

    // ===== FUNCIONES LOCALES =====
    const onDeletingInsumo = ( id ) => {

        dispatch( startDeletingInsumos( id ) );

        setShowDeleteModal( false );
        setInsumoName( '' );
        setInsumoId( '' );
    }

    const insumoToDelete = ( id ) => {

        const { name } = find( equality( 'id', id ), insumos ) || {};

        if ( name ) {

            setInsumoName( name );
            setInsumoId( id );
            setShowDeleteModal( true );
        }
    }

    return (
        <>
            <SearchAndFilterComponent />

            <div
                data-cy="PaginaInsumos"
                className="
                    animate__animated animate__fadeIn
                    grid gap-2
                    self-start
                    w-full
                    px-2 pb-2
                "
            >
                { isEmpty( insumos ) && ( isFiltering || isSearching ) &&
                    <NotFoundInsumos />
                }

                {insumos.map( (insumo, index ) => (
                    <InsumoBase
                        key={ `${insumo}-${index}` }
                        insumo={ insumo }
                        deleteAction={ insumoToDelete }
                    />
                ))}
            </div>

            <BottomModal show={ showDeleteModal } >
                <ConfirmDeletingInsumo
                    close={ () => setShowDeleteModal( false ) }
                    accept={ () => onDeletingInsumo( insumoId ) }
                    name={ insumoName }
                />
            </BottomModal>
        </>
    )
}

const NotFoundInsumos = () => {
    return (
        <h1
            className="
                text-2xl font-bold
            "
        >No se consiguieron Insumos</h1>
    )
}

const ConfirmDeletingInsumo = ({ close, accept, name }) => {
    return (
        <div
            className="
                mt-4
            "
        >
            <h1
                className="
                    text-rose-500 font-semibold text-2xl
                "
            > ¿esta seguro de eliminar este insumo?
            </h1>
            <h2
                className="
                    font-bold text-3xl
                    my-2
                "
            >{ name }</h2>
            <p
                className="
                    my-4
                    text-center text-lg
                "
            >
                ⚠️ esta accion no puede deshacerse ⚠️
            </p>
            <div
                className="
                    flex items-center justify-center
                    mt-8
                "
            >
                <BaseButton
                    isButton
                    className="
                        mx-2 px-2 py-3
                        w-full
                        rounded
                        text-base text-warmgray-800 font-semibold
                        bg-warmGray-200
                    "
                    onClick={ close }
                >Cancelar
                </BaseButton>
                <BaseButton
                    isButton
                    className="
                        mx-2 px-2 py-3
                        w-full
                        rounded
                        text-base text-warmgray-800 font-semibold
                        bg-white
                    "
                    onClick={ accept }
                >Aceptar
                </BaseButton>
            </div>
        </div>
    )
}
