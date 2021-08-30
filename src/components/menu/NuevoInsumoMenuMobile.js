import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { resetForm, startCreateInsumo } from '../../actions/newInsumoAction';

import { misInsumosPath } from '../../constant/routes';

export const NuevoInsumoMenuMobile = () => {

    const dispatch = useDispatch();

    const handleAddInsumo = () => {

        dispatch( startCreateInsumo() );
    }
    
    const handleResetInsumoForm = () => {
        
        dispatch( resetForm() );
    }
    
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
                    icon-circle-left
                    btn-icon
                    flex items-center justify-center
                "
                title="atras"
            ></NavLink>

            <button
                type="button"
                className="
                    icon-cancel-circle
                    btn-icon
                    flex items-center justify-center
                "
                onClick={ handleResetInsumoForm }
            ></button>

            <button
                type="button"
                className="icon-checkmark btn-icon"
                title="Agregar"
                onClick={ handleAddInsumo }
            ></button>

        </div>
    )
}
