import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { clearInsumosToBuy, startCreatingPurchase } from '../../actions/newPurchaseAction';
import { misInsumosPath } from '../../constant/routes';
import { AddCircleButton, CheckButton, CloseCircleButton, BackButton } from '../Buttons/AppButtons';


// ===== VARIABLES CONSTANTES =====
const activeBuyRoute = `${ misInsumosPath }?activeBuy=true`;

export const NuevaCompraMenuMobile = React.memo( () => {

    // ===== NAVEGACION =====
    const history = useHistory();

    // ===== STORE =====
    const dispatch = useDispatch();
    const { establishmentName } = useSelector( state => state.newPurchase );

    // ===== STATE =====
    const [insumosRouteModificated, setInsumosRouteModificated] = useState( activeBuyRoute );

    // ===== FUNCIONES PROPIAS =====
    const handleClickOnClearInsumos = () => {

        dispatch( clearInsumosToBuy() );
    }

    const handleClickOnCheckButton = () => {

        dispatch( startCreatingPurchase() );
    }

    // modificar la url en funcion del establecimiento seleccionado
    useEffect( () => {

        let newRoute = activeBuyRoute;

        if ( establishmentName ) {
            newRoute += `&establishment=${ establishmentName }`;
        }

        setInsumosRouteModificated( newRoute );

    },[establishmentName])

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-4
            "
        >

            <BackButton
                isButton
                onClick={ () => history.goBack() }
            />

            <CloseCircleButton
                isButton
                onClick={ handleClickOnClearInsumos }
            />

            <AddCircleButton
                to={ insumosRouteModificated }
            />

            <CheckButton
                isButton
                onClick={ handleClickOnCheckButton }
            />

        </div>
    )
})
