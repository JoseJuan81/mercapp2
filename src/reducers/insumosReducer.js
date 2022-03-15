import {
    compose,
    equality,
    filter,
    getPropertysValue,
    isEmpty,
    removeItemFromArrayByProp,
    some,
} from "functionallibrary";

import { type } from "../constant/type";

import { alphabeticSorting } from "../helper/alphabeticSorting";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";

/**
 * @description Buscador de insumos por nombre
 * @param {string} searchValue - criterio de busqueda
 */
const onSearch = ( state, searchValue ) => {

    if ( isEmpty( searchValue ) ) {
        return {
            ...state,
            data: state.cache,
        };
    }

    const lowerCaseValue = searchValue.toLowerCase();
    
    const getName = getPropertysValue( 'name' );
    const filtered = filter(
        insumo => getName( insumo ).toLowerCase().includes( lowerCaseValue ),
        state.cache
    );
    return {
        ...state,
        data: filtered
    };
}

/**
 * @description filtrado de insumos por etiquetas
 * @param {string} filterValue - criterio para filtrar insumos
 */
const onFilter = ( localInsumos, filterValue ) => {

    if ( isEmpty( filterValue ) ) {
        return [...localInsumos];
    }

    const lowerCaseValue = filterValue.toLowerCase();
    
    const getLabels = getPropertysValue( 'labels' );
    const someLabelHasThisValue = value => some( l => l.toLowerCase().includes( value ) );
    const findLabelWithThisValue = compose( someLabelHasThisValue( lowerCaseValue ), getLabels );
    const filtered = filter( findLabelWithThisValue, localInsumos );

    return filtered;
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

const initialState = {
    cache: [],
    data: [],
}
export const insumosReducer = ( state = initialState, action ) => {

    const opts = {
        [type.insumos.add]: () => ({ ...state, data: [action.payload, ...state.data] }),
        [type.insumos.getAll]: () => ({ ...state, data: alphabeticSorting( [...state], action.payload ) }),
        [type.insumos.set]: () => ({ ...state, data: [...action.payload], cache: [...action.payload] }),
        [type.insumos.deleteInsumoById]: () => (
            { ...state, data: [...removeItemFromArrayByProp( 'id', action.payload, state.data)] }
        ),
        [type.insumos.updateInsumos]: () => (
            { ...state, data: updateItemInArrayByProp( 'id', action.payload, state.data ) }
        ),
        [type.insumos.search]: () => onSearch( state, action.payload ),
        [type.insumos.filter]: () => (
            { ...state, data: onFilter( action.payload.insumos, action.payload.filterValue ) }
        ),
        [type.insumos.select]: () => (
            { ...state, data: updateItemInArrayByProp( 'id', action.payload, state.data ) }
        ),
        [type.insumos.selectAll]: () => ({ ...state, data: [...action.payload] }),
        [type.insumos.favorites]: () => onFavorites( state, action.payload ),
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}