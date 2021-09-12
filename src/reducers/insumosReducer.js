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
import { updateAnItemInArray } from "../helper/utils";

/**
 * @description Agregar un nuevo insumos en el arreglo de insumos
 * @param {object} newInsumo - Nuevo elemento a agregar
 * @param {array} state - arreglo de insumos
 */
const addNewInsumo = ( newInsumo, state ) => {

    const newState = [newInsumo, ...state];
    setInLocalStorage( typeLocal.insumos, [...newState] );

    return newState;
}

/**
 * @description Establecer los insumos en el store
 * @param {array} insumos - arreglo de insumos
 */
const setInsumos = ( insumos ) => {

    const insumosOrdered = alphabeticSorting( insumos );
    setInLocalStorage( typeLocal.insumos, [...insumosOrdered] );
    return [...insumosOrdered];
}

/**
 * @description Buscador de insumos por nombre
 * @param {string} searchValue - criterio de busqueda
 */
const onSearch = ( searchValue ) => {

    const localInsumos = getFromLocalStorage( typeLocal.insumos ) || [];

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
const onFilter = ( filterValue ) => {

    const localInsumos = getFromLocalStorage( typeLocal.insumos ) || [];

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
 * @description actualizar un insumo dentro del arreglo de insumos
 * @param {object} item - elemento actualizado con propiedad select
 * @param {array} state - arreglo de insumos
 */
const selectOneInsumo = ( item, state ) => {

    const newState = updateAnItemInArray( item, 'id', state );

    const localInsumos = getFromLocalStorage( typeLocal.insumos );
    setInLocalStorage( typeLocal.insumos, [...updateAnItemInArray( item, 'id', localInsumos )] );

    return newState;
}

/**
 * @description Seleccionar / deseleccionar todos los insumos
 * @param {boolean} flag - bandera para seleccionar / deseleccionar todos los insumos
 * @param {array} state - arreglo de insumos
 */
const selecAllInsumos = ( flag, state ) => {

    const newState = map( setNewProperty( 'selected', flag ), state );
    const localInsumos = getFromLocalStorage( typeLocal.insumos ) || [];

    if ( localInsumos.length === newState.length ) {

        setInLocalStorage( typeLocal.insumos, [...newState] );
    } else {

        const localUpdated = updateArrayWithArray( localInsumos, newState, 'id' );
        setInLocalStorage( typeLocal.insumos, [...localUpdated]);
    }

    return newState;
}

export const insumosReducer = ( state = [], action ) => {

    const opts = {
        [insumosType.add]: () => addNewInsumo( action.payload, state ),
        [insumosType.getAll]: () => alphabeticSorting( [...state] ),
        [insumosType.set]: () => setInsumos( action.payload ),
        [insumosType.deleteInsumoById]: () => [...removeItemFromArrayByProp( 'id', action.payload, state)],
        [insumosType.updateInsumos]: () => updateAnItemInArray( action.payload, 'id', state ),
        [insumosType.search]: () => onSearch( action.payload ),
        [insumosType.filter]: () => onFilter( action.payload ),
        [insumosType.select]: () => selectOneInsumo( action.payload, state ),
        [insumosType.selectAll]: () => selecAllInsumos( true, state ),
        [insumosType.unSelectAll]: () => selecAllInsumos( false, state ),
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}