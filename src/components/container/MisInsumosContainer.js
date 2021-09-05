import { isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nuevoInsumoPath } from '../../constant/routes';

import { startLoadingInsumos } from '../../actions/insumosAction';

import { PaginaInsumos } from '../../Pages/PaginaInsumos'
import { BigAddButton } from '../Buttons/BigAddButton';
import { InsumosMenuMobile } from '../Menu/InsumosMenuMobile';
import { PageLoading } from '../../Pages/PageLoading';

const AddButton = ({ path }) => {
    return (
        <div
            className="
                flex items-center justify-center
                h-full w-full
                overflow-scroll
            "
        >
            <BigAddButton
                to={ path }
                title="Nuevo insumo"
            />
        </div>
    )
}

export const MisInsumosContainer = () => {

    const dispatch = useDispatch();

    const { insumos, loading: { loading } } = useSelector( state => state );

    useEffect( () => {

        dispatch( startLoadingInsumos() );

    }, []);

    return (
        <>
            {loading ? <PageLoading />
                :
                <div
                    className="layout__page"
                >
                    {isEmpty( insumos ) ? (

                        <AddButton
                            path={ nuevoInsumoPath }    
                        />

                    ) : (
                        <PaginaInsumos
                            insumos={ insumos }
                        />
                    )}

                    <InsumosMenuMobile
                        toogleShowSearch={ () => {} }
                        toogleShowFilter={ () => {} }
                        openModal={ () => {} }
                    />
                </div>
            }
        </>
    )
}
