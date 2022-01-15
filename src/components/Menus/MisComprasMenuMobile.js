import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPropertysValue, map } from 'functionallibrary';

import { detalleComprasPath, mezclarComprasPath, nuevaCompraPath } from '../../constant/routes';
import { AddCircleButton, FilterButton, MergeButton, SeeDetailsButton } from '../Buttons/AppButtons';

export const MisComprasMenuMobile = () => {

    // ===== STORE =====
    const { selected } = useSelector( state => state.purchases );

    // ===== NAVEGACION =====
    const history = useHistory();

    // ===== VARIABLES LOCALES =====
    const len = selected.length;
    const isAddable = len === 0;
    const isMergeable = len > 1;
    const isDetails = len === 1;

    // ===== FUNCIONES PROPIAS =====
    const handleClickOnDetail = () => {

        if ( isDetails ) {

            const route = `${ detalleComprasPath }?ids=${ selected[0].id }`;
            history.push( route );
        }
    }

    const handleClickOnMerge = () => {

        if ( isMergeable ) {

            const ids = map( getPropertysValue( 'id' ), selected );
            const route = `${ mezclarComprasPath }?compras=${ ids.join(',') }`;
            history.push( route );
        }
    }

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-4
            "
        >

            <FilterButton
                isButton
            />

            <MergeButton
                isButton
                disabled={ !isMergeable }
                onClick={ handleClickOnMerge }
            />

            <SeeDetailsButton
                isButton
                onClick={ handleClickOnDetail }
                disabled={ !isDetails }
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
