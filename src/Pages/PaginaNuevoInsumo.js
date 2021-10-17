import { getPropertysValue, isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { startLoadingInsumoData } from '../actions/newInsumoAction';

import { InsumoForm } from '../components/Form/InsumoForm';
import { editarInsumoPath } from '../constant/routes';
import { extractIdFromPathName } from '../helper/route';
import { PageLoading } from './PageLoading';
import { PageNotAuthorized } from './PageNotAuthorized';

export const PaginaNuevoInsumo = () => {

    const dispatch = useDispatch();
    const { data, isEditing } = useSelector( state => state.newInsumo );
    const { loading } = useSelector( state => state.loading );
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

    if ( loading ) {
        return <PageLoading />
    }

    return (
        <>
            {isEditing && isEmpty( getPropertysValue( 'name', data ) )
                ? <PageNotAuthorized />
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
