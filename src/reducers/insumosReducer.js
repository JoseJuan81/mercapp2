import {
    compose,
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
const onSearch = ( localInsumos, searchValue ) => {

    if ( isEmpty( searchValue ) ) {
        return [...localInsumos];
    }

    const lowerCaseValue = searchValue.toLowerCase();
    
    const getName = getPropertysValue( 'name' );
    const filtered = filter(
        insumo => getName( insumo ).toLowerCase().includes( lowerCaseValue ),
        localInsumos
    );
    return filtered;
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

export const insumosReducer = ( state = [], action ) => {

    const opts = {
        [type.insumos.add]: () => ([action.payload, ...state]),
        [type.insumos.getAll]: () => alphabeticSorting( [...state], action.payload ),
        [type.insumos.set]: () => [...action.payload],
        [type.insumos.deleteInsumoById]: () => [...removeItemFromArrayByProp( 'id', action.payload, state)],
        [type.insumos.updateInsumos]: () => updateItemInArrayByProp( 'id', action.payload, state ),
        [type.insumos.search]: () => onSearch( action.payload.insumos, action.payload.searchValue ),
        [type.insumos.filter]: () => onFilter( action.payload.insumos, action.payload.filterValue ),
        [type.insumos.select]: () => updateItemInArrayByProp( 'id', action.payload, state ),
        [type.insumos.selectAll]: () => [...action.payload],
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}