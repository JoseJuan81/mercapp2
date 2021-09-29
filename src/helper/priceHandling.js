import { isEmpty, round } from 'functionallibrary';

const twoDecimals = round(2);

export const defaultObjectPrice = { name: '', value: 0 };

export const priceFromObjectToArray = ( price ) => {

    if ( isEmpty(price) ) {

        return [defaultObjectPrice];

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