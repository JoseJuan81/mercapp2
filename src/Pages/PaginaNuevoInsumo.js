import { getPropertysValue, isEmpty } from 'functionallibrary';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { startLoadingInsumoData } from '../actions/newInsumoAction';

import { InsumoForm } from '../components/Form/InsumoForm';
import { editarInsumoPath } from '../constant/routes';
import { extractIdFromPathName } from '../helper/route';

export const PaginaNuevoInsumo = () => {

    const dispatch = useDispatch();
    const { data, isEditing } = useSelector( state => state.newInsumo );
    const name = getPropertysValue( 'name', data );

    const query = new URLSearchParams( useLocation() );
    const pathname = query.get( 'pathname' );
    const insumoId = extractIdFromPathName( pathname, editarInsumoPath );

    // Determinar si es edicion o creacion de una insumo para luego consumir servicio
    useEffect( () => {

        
        if ( !!insumoId && isEmpty( name ) && !isEditing ) {
            dispatch( startLoadingInsumoData( insumoId ) );
        }

    }, []);

    return (
        <>
            {isEditing && isEmpty( getPropertysValue( 'name', data ) )
                ? <h1>No tiene permisos para acceder a este insumo</h1>
                : (
                    <div
                        className="
                            animate__animated animate__bounceInUp animate__faster
                            fixed top-0 left-0 z-20
                            w-full h-full
                            bg-black bg-opacity-70
                            flex items-end justify-center
                        "
                    >
                        <InsumoForm
                            insumoData={ data }
                            isEditing={ isEditing }
                        />   
                    </div>
                )
            }
        </>
    )
}
