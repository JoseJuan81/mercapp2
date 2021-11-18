import { isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingInsumoData } from '../actions/insumoDetailsAction';
import { InsumoDataInfo } from '../components/Insumos/InsumoDataInfo';
import { InsumoPriceInfo } from '../components/Insumos/InsumoPriceInfo';
import { InsumoStatisticsInfo } from '../components/Insumos/InsumoStatisticsInfo';

export const PaginaDetalleInsumo = () => {
    
    // ===== NAVIGATION =====
    const url = new URL( window.location );
    const insumoId = url.searchParams.get( 'insumoId' );


    // ===== STORE =====
    const dispatch = useDispatch()
    const { data } = useSelector( store => store.insumoDetails );

    // cargar datos del insumo
    useEffect(() => {

        if ( insumoId !== data.id ) {

            dispatch( startLoadingInsumoData( insumoId ) );
        }

    }, [insumoId, data.id, dispatch]);

    return (
        <div
            className="
                px-2 pt-3
                flex items-start justify-center
            "
        >
            {!isEmpty( url.searchParams.get('data') ) && (
                <InsumoDataInfo data={ data } />
            )}

            {!isEmpty( url.searchParams.get('prices') ) && (
                <InsumoPriceInfo />
            )}

            {!isEmpty( url.searchParams.get('statistics') ) && (
                <InsumoStatisticsInfo />
            )}
        </div>
    )
}
