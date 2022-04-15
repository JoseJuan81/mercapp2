import {
    equality,
    filter,
    isEmpty as isFullyEmpty,
    removeItemFromArrayByProp,
} from "functionallibrary";
import { always, complement, cond, isEmpty } from 'ramda';

import { type } from "../constant/type";

import { alphabeticSorting } from "../helper/alphabeticSorting";
import { findElementsByLabelsMatch, findElementsByName } from "../helper/searchAndFilterInsumos";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";

const isNotEmpty = complement(isEmpty);

/**
 * @description Buscador de insumos por nombre
 * @param {string} searchValue - criterio de busqueda
 */
const onSearch = ( state, searchValue ) => {

    const getDataSearched = cond([
        [isFullyEmpty, always( state.cache )],
        [isNotEmpty, findElementsByName( state.cache )]
    ])

    const dataSearched = getDataSearched( searchValue );
    return { ...state, data: [...dataSearched] };
}

/**
 * @description filtrado de insumos por etiquetas
 * @param {string} filterValue - criterio para filtrar insumos
 */
const onFilter = ( state, filterValue ) => {

    const getDataFiltered = cond([
        [isFullyEmpty, always( state.cache )],
        [isNotEmpty, findElementsByLabelsMatch( state.cache )]
    ])
    const dataFiltered = getDataFiltered( filterValue );
    return { ...state, data: [...dataFiltered] };
}

/**
 * @description filtrar productos favoritos
 * @param {object} state - estado
 * @param {boolean} flag - indica si se muestran o no los favoritos
 * 
 * @return {array} - arreglo de productos favoritos
 */
const onFavorites = ( state, flag ) => {

    if ( flag ) {

        return {
            cache: [...state.data],
            data: filter( equality( 'isFavorite', true ), state.data),
        }

    }

    return {
        cache: [],
        data: [...state.cache],
    }
}

export const initialState = {
    cache: [],
    data: [],
}
export const insumosReducer = ( state = initialState, action ) => {

    const opts = {
        [type.insumos.add]: () => ({
            ...state,
            cache: [action.payload, ...state.data],
            data: [action.payload, ...state.data]
        }),
        [type.insumos.getAll]: () => ({
            ...state,
            data: alphabeticSorting( state.data, action.payload )
        }),
        [type.insumos.set]: () => ({ ...state, data: [...action.payload], cache: [...action.payload] }),
        [type.insumos.deleteInsumoById]: () => {
            const removedIt = removeItemFromArrayByProp( 'id', action.payload, state.data);
            return {
                ...state,
                cache: [...removedIt],
                data: [...removedIt]
            }
        },
        [type.insumos.updateInsumos]: () => {
            const updated = updateItemInArrayByProp( 'id', action.payload, state.data );
            return {
                ...state,
                cache: [...updated],
                data: [...updated]
            }
        },
        [type.insumos.search]: () => onSearch( state, action.payload ),
        [type.insumos.filter]: () => onFilter( state, action.payload ),
        [type.insumos.select]: () => (
            {
                ...state,
                cache: updateItemInArrayByProp( 'id', action.payload, state.data ),
                data: updateItemInArrayByProp( 'id', action.payload, state.data )
            }
        ),
        [type.insumos.selectAll]: () => ({ ...state, cache: [...action.payload], data: [...action.payload] }),
        [type.insumos.favorites]: () => onFavorites( state, action.payload ),
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}