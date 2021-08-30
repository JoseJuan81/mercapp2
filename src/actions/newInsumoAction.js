import { round } from "functionallibrary";

import { newInsumoForm } from "../constant/newInsumoTypeForm";
import { db } from "../firebase/firebase-config";
import { addInsumoToState } from "./insumosAction";
// import { createInsumoInLocal } from "../helper/indexDB";
// import IDB from "../services/indexDB/insumo";

// const idb = new IDB('insumos');

const twoDecimals = round(2);

/// ============= Acciones sincronas ================= //
export const fillingForm = ( { name, value } ) => {

    const isPrice = name === 'price';

    if ( isPrice ) {

        return {
            type: newInsumoForm.fill,
            payload: {
                [name]: {
                    [value.name.toLowerCase()]: twoDecimals( Number( value.value ) )
                }
            }
        }

    }

    return {
        type: newInsumoForm.fill,
        payload: { [name]: value }
    }
}

export const resetForm = () => ({
    type: newInsumoForm.reset
})

/// ============= Acciones asincronas ================= //
export const startCreateInsumo = () => async ( dispatch, rootState ) => {

    const { auth: { uid }, newInsumo } = rootState();

    const insumoCreated = await db.collection( `${ uid }/app/insumos` ).add( newInsumo );
    
    dispatch( addInsumoToState( { ...newInsumo, id: insumoCreated.id } ) );
    // createInsumoInLocal( { ...newInsumo, id: insumoCreated.id });
    dispatch ( resetForm() );

}