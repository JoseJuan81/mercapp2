import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { resetForm, startCreateInsumo, startUpdateInsumo } from '../../actions/newInsumoAction';
import { nuevaCompraPath } from '../../constant/routes';


export const NuevoInsumoMenuMobile = () => {

    const url = new URL( window.location );
    const isBuyActive = url.searchParams.get('activeBuy');
    const establishmentName = url.searchParams.get('establishment');

    const history = useHistory();

    const { isEditing } = useSelector( state => state.newInsumo );

    const dispatch = useDispatch();

    const handleOnClick = () => {
        
        if ( isEditing ) {

            dispatch( startUpdateInsumo() );
            history.goBack()
        } else {
        
            dispatch( startCreateInsumo( isBuyActive ) );
        }
    }
    
    const handleResetInsumoForm = () => {
        
        dispatch( resetForm() );
    }

    const handleClickOnBack = () => {

        if ( isBuyActive ) {

            history.push( `${ nuevaCompraPath }?establishment=${ establishmentName }` );
        } else {

            history.goBack();
        }
    }

    useEffect( () => {

        // limpiar el formulario al salir de la pantalla
        return () => {
            handleResetInsumoForm();
        }

    }, []);
    
    return (
        <div
            className="
                fixed bottom-0
                w-full
                grid grid-cols-3
                h-16
                z-30
            "
        >

            <button
                type="button"
                className="
                    btn-icon
                    flex items-center justify-center
                "
                onClick={ handleClickOnBack }
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            <button
                type="button"
                className="
                    icon-cancel-circle
                    btn-icon
                    flex items-center justify-center
                "
                onClick={ handleResetInsumoForm }
            >
                <i className="far fa-times-circle"></i>
            </button>

            <button
                type="button"
                className="btn-icon"
                title="Agregar"
                onClick={ handleOnClick }
            >
                <i className="fas fa-check"></i>
            </button>

        </div>
    )
}
