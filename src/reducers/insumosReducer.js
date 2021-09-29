import {
    compose,
    filter,
    getPropertysValue,
    isEmpty,
    map,
    removeItemFromArrayByProp,
    setNewProperty,
    some,
} from "functionallibrary";

import { insumosType } from "../constant/insumosType";
import { typeLocal } from "../constant/localStorage";
import { alphabeticSorting } from "../helper/alphabeticSorting";
import { getFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { updateArrayWithArray } from "../helper/updateArrayWithArray";
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
        [insumosType.add]: () => ([action.payload, ...state]),
        [insumosType.getAll]: () => alphabeticSorting( [...state], action.payload ),
        [insumosType.set]: () => [...action.payload],
        [insumosType.deleteInsumoById]: () => [...removeItemFromArrayByProp( 'id', action.payload, state)],
        [insumosType.updateInsumos]: () => updateItemInArrayByProp( 'id', action.payload, state ),
        [insumosType.search]: () => onSearch( action.payload.insumos, action.payload.searchValue ),
        [insumosType.filter]: () => onFilter( action.payload.insumos, action.payload.filterValue ),
        [insumosType.select]: () => updateItemInArrayByProp( 'id', action.payload, state ),
        [insumosType.selectAll]: () => [...action.payload],
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}