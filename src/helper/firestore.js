export const extractInsumosFromFirestoreResponse = ( response ) => {

    const insumos = [];
    response.forEach( insumo => {

        insumos.push( { id: insumo.id, ...insumo.data() } );
    })

    return insumos;
}