import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


import { showSearchField, hideSearchAndFilterField, showFilterField } from '../../actions/searchAction';
import { nuevoInsumoPath } from '../../constant/routes';

export const InsumosMenuMobile = React.memo(() => {

    const { showField, isSearching, isFiltering } = useSelector( state => state.search );

    const dispatch = useDispatch();

    const toogleShowSearch = () => {
        
        if ( ( showField && isFiltering ) || !showField ) {
            
            dispatch( showSearchField() );
        } else {
            
            dispatch( hideSearchAndFilterField() );
        }
    }

    const toogleShowFilter = () => {

        if ( ( showField && isSearching ) || !showField ) {
            
            dispatch( showFilterField() );
        } else {
            
            dispatch( hideSearchAndFilterField() );
        }
    }
    return (
        <div
            className="
                menu_mobile__container
                grid-cols-5
            "
        >
            
            <button
                className="icon-checkmark btn-icon"
                title="Seleccionar todo"
                onClick={ () => dispatch({ type: 'select-all' }) }
            ></button>

            <button
                className="icon-checkmark btn-icon text-warmGray-300"
                title="Deseleccionar todo"
                onClick={ () => dispatch({ type: 'unselect-all' }) }
                ></button>

            <button
                className="icon-search btn-icon"
                title="Buscar"
                onClick={ toogleShowSearch }
            ></button>

            <button
                className="icon-filter btn-icon"
                title="Filtrar"
                onClick={ toogleShowFilter }
            ></button>

            <NavLink
                to={ nuevoInsumoPath }
                className="
                    icon-plus
                    btn-icon
                    flex items-center justify-center
                "
            ></NavLink>

        </div>
    )
})
