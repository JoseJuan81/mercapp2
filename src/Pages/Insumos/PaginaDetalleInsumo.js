import { isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLoadingInsumoData } from '../../actions/insumoDetailsAction';

import { InsumoDataInfo } from '../../components/Insumos/InsumoDataInfo';
import { InsumoStatisticsInfo } from '../../components/Insumos/InsumoStatisticsInfo';

import { orderingAscByDate } from '../../helper/orderingByDate';

export const PaginaDetalleInsumo = () => {
    
    // ===== NAVIGATION =====
    const url = new URL( window.location );
    const insumoId = url.searchParams.get( 'insumoId' );


    // ===== STORE =====
    const dispatch = useDispatch()
    const { data, prices } = useSelector( store => store.insumoDetails );
    const { loading } = useSelector( store => store.loading );

    // ===== VARIABLES LOCALES =====
    const historyPrice = orderingAscByDate( data.historyPrice );

    // cargar datos del insumo
    useEffect(() => {

        if ( insumoId !== data.id ) {

            dispatch( startLoadingInsumoData( insumoId ) );
        }

    }, [insumoId, data.id, dispatch]);

    return (
        <div
            className="
                pt-3
                flex items-start justify-center
            "
        >

            {!isEmpty( url.searchParams.get('data') ) && (
                <InsumoDataInfo data={ data } prices={ prices } />
            )}

            {!isEmpty( url.searchParams.get('statistics') ) && !loading && (
                <InsumoStatisticsInfo historyPrices={ historyPrice } name={ data.name } />
            )}

        </div>
    )
}
