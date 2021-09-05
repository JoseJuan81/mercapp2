import { compose, equality, find, findIndex, isEmpty, reduce, round, setNewProperty } from 'functionallibrary';

const twoDecimals = round(2);

export const updateItemInArrayByProp = (prop, item, arr) => {
    const index = findIndex(
        equality(prop, item[prop]),
        arr
    )

    const local = [...arr];
    local.splice( index, 1, item );

    return local;
}

export const defaultObjectPrice = { name: '', value: 0 };

export const priceFromObjectToArray = ( price ) => {

    if ( isEmpty(price) ) {

        return [defaultObjectPrice];

    } else {

        return Object.keys( price ).map(p => ({ name: p, value: price[p] }));

    }
}

export const priceFromArrayToObject = ( arr ) => {

    return arr.reduce( (acc, { name, value } ) => {

        const localAcc = { ...acc };
        localAcc[name.toLowerCase().trim()] = value;

        return localAcc;        
    }, {} )
}

export const extractInsumosFromFirestoreResponse = ( response ) => {

    const insumos = [];
    response.forEach( insumo => {

        insumos.push( { id: insumo.id, ...insumo.data() } );
    })

    return insumos;
}

export const updateAnItemInArray = ( item, state ) => {

    const index = find(
        equality( 'id', item.id ),
        state
    );

    const localState = [...state];
    localState.splice( index, 1, item );

    return [...localState];
}