import { isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { filteringInsumo, searchingInsumo } from '../../actions/insumosAction';
import { showSearchField } from '../../actions/searchAction';

import { Searcher } from '../Form/Searcher';

import { SearchButton } from '../Buttons/AppButtons';

export const SearchAndFilterComponent = () => {

    // ===== NAVEGACION =====
    const url = new URL( window.location );
    const history = useHistory();

    // ===== STORE =====
    const { showField, isSearching, isFiltering } = useSelector( store => store.search );

    const dispatch = useDispatch();

    // ===== STATE =====
    const [q, setQ] = useState( null );

    // ===== FUNCIONES PROPIAS =====
    const handleOnSearch = (  ) => {

        const existQ = url.searchParams.get('q');

        if ( existQ ) {
            url.searchParams.set('q', q);
        } else {
            url.searchParams.append('q', q);
        }

        history.push( url.pathname + url.search );
    }

    const handleOnFilter = ( filterValue ) => {

        dispatch( filteringInsumo( filterValue ) );
    }

    useEffect(() => {

        const query = url.searchParams.get('q');

        if ( query ) {
            setQ( query );
            dispatch( showSearchField() );
            dispatch( searchingInsumo( query ) );
        }

    },[q])

    useEffect(() => {

        if ( isEmpty( q ) ) {
            dispatch( searchingInsumo( q ) )
        }

    }, [q])

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
                        flex
                    "
                >
                    <Searcher
                        placeholder="Buscar insumo"
                        onSearch={ setQ }
                        submit={ ( v ) => dispatch( searchingInsumo( v ) ) }
                        initialValue={ q }
                    />
                    <SearchButton
                        isButton
                        className="
                            bg-warmGray-100 text-warmGray-500
                            px-4 ml-2
                        "
                        onClick={ handleOnSearch }
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
                    <SearchButton
                        isButton
                        className="
                            bg-warmGray-100 text-warmGray-500
                            px-4 ml-2
                        "
                    />
                </div>

            }
        </div>
    )
}
