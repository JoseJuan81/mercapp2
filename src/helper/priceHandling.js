import { isEmpty, round } from 'functionallibrary';

import { DEFAULT_OBJECT_PRICE } from '../constant/defaults';

const twoDecimals = round(2);

export const priceFromObjectToArray = ( price ) => {

    if ( isEmpty(price) ) {

        return [DEFAULT_OBJECT_PRICE];

    } else {

        return Object.keys( price ).map(p => ({ name: p, value: twoDecimals( price[p] ) }));

    }
}

export const priceFromArrayToObject = ( arr ) => {

    return arr.reduce( (acc, { name, value } ) => {

        const localAcc = { ...acc };
        localAcc[name.toLowerCase().trim()] = value;

        return localAcc;        
    }, {} )
}