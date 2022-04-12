import { equality, find, isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startDeletingInsumos } from '../actions/insumosAction';
import { hideSearchAndFilterField, showFilterField, showSearchField } from '../actions/searchAction';

import { BaseButton, FilterButton, SearchButton } from '../components/Buttons/AppButtons';
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
            <div
                className="
                    flex
                    px-2 pt-3 pb-4
                    sticky top-0 z-10
                    bg-white
                "
            >
                <SearchAndFilterRadioButtons />
                <SearchAndFilterComponent />
            </div>

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

const SearchAndFilterRadioButtons = () => {

    // ===== STORE =====
    const dispatch = useDispatch();
    const { showField, isSearching, isFiltering } = useSelector( store => store.search );

    // ===== FUNCIONES PROPIAS =====
    const toogleShowSearch = () => {
        
        if ( ( showField && isFiltering ) || !showField ) {
            
            dispatch( showSearchField() );
        } else {
            
            dispatch( hideSearchAndFilterField() );
        }
    }

    const toogleShowFilter = () => {

        if ( ( showField && isSearching ) || !showField ) {
            
            dispatch( showFilterField() );
        } else {
            
            dispatch( hideSearchAndFilterField() );
        }
    }

    useEffect(() => {
        dispatch( showSearchField() );
    }, [])

    return (
        <div
            className="
                flex
                mr-2
            "
        >
            <SearchButton
                isButton
                className={`
                    py-2 px-4
                    text-base ${ isSearching ? 'text-lime-500' : 'text-warmGray-500' }
                    ${ isSearching ? 'bg-lime-50' : 'bg-warmGray-50' }
                `}
                onClick={ toogleShowSearch }
            />

            <FilterButton
                isButton
                className={`
                    py-2 px-4
                    text-base ${ isFiltering ? 'text-lime-500' : 'text-warmGray-500' }
                    ${ isFiltering ? 'bg-lime-50' : 'bg-warmGray-50' }
                `}
                onClick={ toogleShowFilter }
            />
        </div>
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
