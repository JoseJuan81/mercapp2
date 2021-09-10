import { compose, filter, getPropertysValue, isEmpty, map, removeItemFromArrayByProp, setNewProperty, some } from "functionallibrary";

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
    const someLabelHasThisValue = value => some( l => l.toLowerCase().includes( value ) );
    const findLabelWithThisValue = compose( someLabelHasThisValue( lowerCaseValue ), getLabels );
    const filtered = filter( findLabelWithThisValue, insumosCache );

    return filtered;
}

export const insumosReducer = ( state = [], action ) => {

    const opts = {
        [insumosType.add]: () => ([action.payload, ...state]),
        [insumosType.getAll]: () => [...state],
        [insumosType.set]: () => setInsumos( action.payload ),
        [insumosType.deleteInsumoById]: () => [...removeItemFromArrayByProp( 'id', action.payload, state)],
        [insumosType.updateInsumos]: () => updateAnItemInArray( action.payload, 'id', state ),
        [insumosType.search]: () => onSearch( action.payload ),
        [insumosType.filter]: () => onFilter( action.payload ),
        [insumosType.select]: () => updateAnItemInArray( action.payload, 'id', state ),
        [insumosType.selectAll]: () => map( setNewProperty( 'selected', true ), state ),
        [insumosType.unSelectAll]: () => map( setNewProperty( 'selected', false ), state ),
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}