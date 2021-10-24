import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { clearInsumosToBuy } from '../../actions/buyAction';
import { misInsumosPath } from '../../constant/routes';
import { AddCircleButton } from '../Buttons/AddCircleButton';

// ===== VARIABLES CONSTANTES =====
const activeBuyRoute = `${ misInsumosPath }?activeBuy=true`;

export const NuevaCompraMenuMobile = React.memo( () => {

    // ===== NAVEGACION =====
    const history = useHistory();

    // ===== STORE =====
    const dispatch = useDispatch();
    const { establishmentName } = useSelector( state => state.buy );

    // ===== STATE =====
    const [insumosRouteModificated, setInsumosRouteModificated] = useState( activeBuyRoute );

    // ===== FUNCIONES PROPIAS =====
    const handleClickOnClearInsumos = () => {

        dispatch( clearInsumosToBuy() );
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

            <button
                type='button'
                className="
                    btn-icon
                    flex items-center justify-center
                "
                onClick={ () => history.goBack() }
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            <button
                type="button"
                className="
                    btn-icon
                    flex items-center justify-center
                "
                onClick={ handleClickOnClearInsumos }
            >
                <i className="far fa-times-circle"></i>
            </button>

            <AddCircleButton
                to={ insumosRouteModificated }
            />

            <NavLink
                to={ misInsumosPath }
                className="btn-icon flex items-center justify-center"
                title="Agregar"
            >
                <i className="fas fa-check"></i>
            </NavLink>

        </div>
    )
})
