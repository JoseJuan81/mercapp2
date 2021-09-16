import React from 'react';
import { useHistory } from 'react-router-dom';


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

            <button
                type="button"
                className="btn-icon"
                title="Agregar"
            >
                <i className="fas fa-plus-circle"></i>
            </button>

        </div>
    )
}
