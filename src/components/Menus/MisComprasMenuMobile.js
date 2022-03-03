import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPropertysValue, map } from 'functionallibrary';

import { comprasEstadisticas, nuevaCompraPath } from '../../constant/routes';
import { AddCircleButton, FilterButton, PriceStatisticsButton } from '../Buttons/AppButtons';

export const MisComprasMenuMobile = () => {

    // ===== STORE =====
    const { selected } = useSelector( state => state.purchases );

    // ===== NAVEGACION =====
    const history = useHistory();

    // ===== VARIABLES LOCALES =====
    const len = selected.length;
    const isAddable = len === 0;
    const isStatistics = len > 0;
    // const isDetails = len === 1;

    // ===== FUNCIONES PROPIAS =====

    const handleClickOnMerge = () => {

        if ( isStatistics ) {

            const ids = map( getPropertysValue( 'id' ), selected );
            const route = `${ comprasEstadisticas }?compras=${ ids.join(',') }`;
            history.push( route );
        }
    }

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-3
                z-20
            "
        >

            <FilterButton
                isButton
            />

            <PriceStatisticsButton
                isButton
                disabled={ !isStatistics }
                onClick={ handleClickOnMerge }
            />

            <AddCircleButton
                disabled={ !isAddable }
                to={ nuevaCompraPath }
                className="
                    flex items-center justify-center
                "
            />

        </div>
    )
}
