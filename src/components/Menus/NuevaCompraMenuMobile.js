import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { misInsumosPath } from '../../constant/routes';


export const NuevaCompraMenuMobile = () => {

    const history = useHistory();

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-3
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
            >
                <i className="far fa-times-circle"></i>
            </button>

            <NavLink
                to={ misInsumosPath }
                className="btn-icon flex items-center justify-center"
                title="Agregar"
            >
                <i className="fas fa-check"></i>
            </NavLink>

        </div>
    )
}
