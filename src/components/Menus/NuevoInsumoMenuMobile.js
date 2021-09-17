import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { resetForm, startCreateInsumo, startUpdateInsumo } from '../../actions/newInsumoAction';

import { misInsumosPath } from '../../constant/routes';

export const NuevoInsumoMenuMobile = () => {

    const history = useHistory();

    const { isEditing } = useSelector( state => state.newInsumo );

    const dispatch = useDispatch();

    const handleOnClick = () => {
        
        if ( isEditing ) {

            dispatch( startUpdateInsumo() );
            history.push( misInsumosPath );
        } else {
        
            dispatch( startCreateInsumo() );
        }
    }
    
    const handleResetInsumoForm = () => {
        
        dispatch( resetForm() );
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
                grid grid-cols-3
                h-16
            "
        >

            <NavLink
                to={ misInsumosPath }
                className="
                    btn-icon
                    flex items-center justify-center
                "
                title="atras"
            >
                <i className="fas fa-chevron-left"></i>
            </NavLink>

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
