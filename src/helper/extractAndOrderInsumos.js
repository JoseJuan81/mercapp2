import { map, setNewProperty } from "functionallibrary";

export const extractAndOrderInsumos = ( purchases ) => {

    const insumos = extractInsumos( purchases );
    const insumosOrdered = decendingOrder( insumos );
    
    return insumosOrdered;
}

const extractInsumos = ( purchases ) => {
    
    let arr = [];
    purchases.forEach( purchase => {

        const { establishmentName, insumos } = purchase;
        const insumosByEstablishment = map(
            setNewProperty( 'establishmentName', establishmentName ),
            insumos
        );

        arr = arr.concat( insumosByEstablishment )
    })

    return [...arr]
}

const decendingOrder = ( eles ) => {
    return eles.sort( (a, b) => b.total - a.total );
}