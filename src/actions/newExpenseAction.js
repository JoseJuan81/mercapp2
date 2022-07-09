import { type } from "../constant/type";

/// ============= Acciones asincronas ================= //
export const updateNewExpense = ( newExpenseObj ) => ({
    type: type.newExpense.update,
    payload: newExpenseObj
})