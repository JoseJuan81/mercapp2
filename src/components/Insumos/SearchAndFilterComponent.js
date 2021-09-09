import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filteringInsumo, searchingInsumo } from '../../actions/insumosAction';
import { Searcher } from '../Form/Searcher';

export const SearchAndFilterComponent = () => {

    const { showField, isSearching, isFiltering } = useSelector( state => state.search );

    const dispatch = useDispatch();

    const handleOnSearch = ( searchValue ) => {

        dispatch( searchingInsumo( searchValue ) );
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
                mb-4 px-2
                ${ showField ? 'min-h-12' : 'min-h-0' }
            `}
        >
            {isSearching &&
                <div
                    className="
                        animate__animated animate__slideInDown
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
                animate__animated animate__slideInDown
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
