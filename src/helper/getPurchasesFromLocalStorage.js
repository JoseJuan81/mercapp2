import { equality, findIndex } from "functionallibrary"

export const getPurchasesFromLocalStorage = ( ids, array ) => {

    let acc = [];
    ids.forEach( id => {
        const index = findIndex( equality( 'id', id ), array );

        if( index > -1) {
            acc = acc.concat( array[index] );
        }
    })

    const orderByDate = acc.sort((a, b) => a.date - b.date );

    return orderByDate;
}