import { typeBuy } from "../constant/buy";

/// ============= Acciones sincronas ================= //
export const loadSelectedInsumos = () => ({
    type: typeBuy.selected
})

export const setEstablishmentInBuy = ( name ) => ({
    type: typeBuy.establishment,
    payload: name
})