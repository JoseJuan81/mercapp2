import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filteringInsumo, searchingInsumo } from '../../actions/insumosAction';

import { Searcher } from '../Form/Searcher';


export const SearchAndFilterComponent = () => {

    // ===== STORE =====
    const { showField, isSearching, isFiltering } = useSelector( store => store.search );

    const dispatch = useDispatch();

    // ===== FUNCIONES PROPIAS =====
    const handleOnSearch = ( query ) => {

        dispatch( searchingInsumo( query ) )
    }

    const handleOnFilter = ( filterValue ) => {

        dispatch( filteringInsumo( filterValue ) );
    }

    return (
        <div
            className={`
                w-full
                overflow-hidden
                duration-700 delay-200
                ${ showField ? 'min-h-12' : 'min-h-0' }
            `}
        >
            {isSearching &&
                <div
                    className="
                        animate__animated animate__slideInLeft
                        flex
                    "
                >
                    <Searcher
                        placeholder="Buscar insumo"
                        onSearch={ handleOnSearch }
                    />
                </div>

}

            {isFiltering &&
                <div
                className="
                animate__animated animate__slideInLeft
                "
                >
                    <Searcher
                        placeholder="Filtrar insumos"
                        onSearch={ handleOnFilter }
                    />
                </div>

            }
        </div>
    )
}
