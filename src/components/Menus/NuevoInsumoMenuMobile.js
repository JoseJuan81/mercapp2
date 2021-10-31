import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { resetForm, startCreateInsumo, startUpdateInsumo } from '../../actions/newInsumoAction';

import { nuevaCompraPath } from '../../constant/routes';

import { BackButton, CheckButton, CloseCircleButton } from '../Buttons/AppButtons';


export const NuevoInsumoMenuMobile = () => {

    const url = new URL( window.location );
    const isBuyActive = url.searchParams.get('activeBuy');
    const establishmentName = url.searchParams.get('establishment');

    const history = useHistory();

    const { isEditing } = useSelector( state => state.newInsumo );

    const dispatch = useDispatch();

    const handleOnClick = async () => {
        
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

            history.push( nuevaCompraPath );
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

            <BackButton
                isButton
                className="
                    flex items-center justify-center
                "
                onClick={ handleClickOnBack }
            />

            <CloseCircleButton
                isButton
                className="
                    flex items-center justify-center
                "
                onClick={ handleResetInsumoForm }
            />

            <CheckButton
                isButton
                onClick={ handleOnClick }
            />

        </div>
    )
}
