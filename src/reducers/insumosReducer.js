import { compose, filter, getPropertysValue, isEmpty, removeItemFromArrayByProp, some } from "functionallibrary";

import { insumosType } from "../constant/insumosType";
import { updateAnItemInArray } from "../helper/utils";

let insumosCache = [];

const setInsumos = ( insumos ) => {

    insumosCache = [...insumos];
    return [...insumos];
}

const onSearch = ( searchValue ) => {

    if ( isEmpty( searchValue ) ) {
        return [...insumosCache];
    }

    const lowerCaseValue = searchValue.toLowerCase();
    
    const getName = getPropertysValue( 'name' );
    const filtered = filter(
        insumo => getName( insumo ).toLowerCase().includes( lowerCaseValue ),
        insumosCache
    );
    return filtered;
}

const onFilter = ( filterValue ) => {

    if ( isEmpty( filterValue ) ) {
        return [...insumosCache];
    }

    const lowerCaseValue = filterValue.toLowerCase();
    
    const getLabels = getPropertysValue( 'labels' );
    const someLabelHasThisValue = some( l => l.toLowerCase().includes( lowerCaseValue ) );
    const findLabelWithThisValue = compose( someLabelHasThisValue, getLabels );
    const filtered = filter( findLabelWithThisValue, insumosCache );

    return filtered;
}

export const insumosReducer = ( state = [], action ) => {

    const opts = {
        [insumosType.add]: () => ([action.payload, ...state]),
        [insumosType.getAll]: () => [...state],
        [insumosType.set]: () => setInsumos( action.payload ),
        [insumosType.deleteInsumoById]: () => [...removeItemFromArrayByProp( 'id', action.payload, state)],
        [insumosType.updateInsumos]: () => updateAnItemInArray( action.payload, state ),
        [insumosType.search]: () => onSearch( action.payload ),
        [insumosType.filter]: () => onFilter( action.payload ),
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}