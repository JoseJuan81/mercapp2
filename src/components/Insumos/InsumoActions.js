import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { startDeletingInsumos } from '../../actions/insumosAction';
import { setInsumoToUpdate } from '../../actions/newInsumoAction';
import { removeInsumoFromPurchase } from '../../actions/newPurchaseAction';

import { editarInsumoPath } from '../../constant/routes';
import { EditButton, LeftCircleButton, SeeDetailsButton, TrashButton } from '../Buttons/AppButtons';

export const InsumoBaseActions = React.memo( ({ id }) => {

    // ===== NAVIGATION =====
    const history = useHistory();

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== STATE =====
    const [toogle, setToogle] = useState(false);

    // ===== FUNCIONES PROPIEAS =====
    const handleClick = useCallback(( ev ) => {
        ev.stopPropagation();

        setToogle( s => !s );
    },[])

    const handleDeleteInsumo = useCallback(( ev ) => {
        ev.stopPropagation();

        dispatch( startDeletingInsumos( id ) );
        setToogle( false );
    },[])
    
    const handleUpdateInsumo = ( ev ) => {
        ev.stopPropagation();

        dispatch( setInsumoToUpdate( id ) );

        history.push( `${ editarInsumoPath }/${ id }` );
    }

    return (
        <div
            className={`
                absolute right-1
                h-10
                bg-warmGray-100
                flex
                transform ${ toogle ? 'translate-x-1' : 'translate-x-40' }
                border border-solid ${ toogle ? 'border-warmGray-200' : 'border-white' }
                rounded-l-full
                duration-300
            `}
        >
            <LeftCircleButton
                isButton
                className={`
                    bg-white
                    flex items-center justify-center
                    text-warmGray-600 text-xl
                    transform ${toogle ? 'rotate-180' : 'rotate-0'}
                    w-10
                    ${ toogle ? 'rounded-full' : 'rounded-l-full' }
                    border border-solid border-warmGray-200
                    duration-300
                `}
                onClick= { handleClick }
            />

            <div
                className="
                    grid grid-cols-3 gap-2
                    px-2
                "
            >
                <SeeDetailsButton
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    to=""
                />

                <EditButton
                    isButton
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleUpdateInsumo }
                />

                <TrashButton
                    isButton
                    type="button"
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleDeleteInsumo }
                />
            </div>

        </div>
    )
})

export const InsumoActions = React.memo( ({ id }) => {
    
    // ===== NAVIGATION =====
    const history = useHistory();

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== STATE =====
    const [toogle, setToogle] = useState(false);

    // ===== FUNCIONES PROPIEAS =====
    const handleClick = useCallback(( ev ) => {
        ev.stopPropagation();

        setToogle( s => !s );
    },[])

    const handleDeleteInsumo = useCallback(( ev ) => {
        ev.stopPropagation();

        dispatch( removeInsumoFromPurchase( id ) );
    },[])
    
    // const handleUpdateInsumo = useCallback(( ev ) => {
    //     ev.stopPropagation();

    //     dispatch( setInsumoToUpdate( id ) );

    //     history.push( `${ editarInsumoPath }/${ id }` );
    // },[])

    return (
        <div
            className={`
                absolute right-1
                h-10
                bg-warmGray-100
                flex
                transform ${ toogle ? 'translate-x-10' : 'translate-x-24' }
                border border-solid ${ toogle ? 'border-warmGray-200' : 'border-white' }
                rounded-l-full
                duration-300
            `}
        >
            <LeftCircleButton
                isButton
                className={`
                    bg-white
                    flex items-center justify-center
                    text-warmGray-600 text-xl
                    transform ${toogle ? 'rotate-180' : 'rotate-0'}
                    w-10
                    ${ toogle ? 'rounded-full' : 'rounded-l-full' }
                    border border-solid border-warmGray-200
                    duration-300
                `}
                onClick= { handleClick }
            />

            <div
                className="
                    grid grid-cols-2 gap-2
                    px-2
                "
            >
                {/* <EditButton
                    isButton
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleUpdateInsumo }
                /> */}
                <TrashButton
                    isButton
                    type="button"
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleDeleteInsumo }
                />
            </div>

        </div>
    )
})
