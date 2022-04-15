import { maxIndex } from "d3";
import { map, setNewProperty } from "functionallibrary";

export const extractAndOrderInsumos = ( purchases ) => {

    const insumos = extractInsumos( purchases );
    const insumosOrdered = decendingOrder( insumos );
    const expensiveInsumo = getExpensiveInsumo( insumosOrdered );
    const expenseInsumo = getExpenseInsumo( insumosOrdered );
    
    return {
        insumos: insumosOrdered,
        expensive: expensiveInsumo,
        expense: expenseInsumo,
    }
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

const getExpensiveInsumo = ( insumos ) => {

    const maxInsumo = maxIndex( insumos, d => d.total / d.quantity );
    return insumos[maxInsumo];
}

const getExpenseInsumo = ( insumos ) => {

    const maxInsumo = maxIndex( insumos, d => d.total );
    return insumos[maxInsumo];
}