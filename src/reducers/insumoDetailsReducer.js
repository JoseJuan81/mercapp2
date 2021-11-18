import { type } from "../constant/type";

const initialState = {
    data: {},
    prices: {},
    statistics: {},
}

export const insumoDetailsReducer = ( state = initialState, action ) => {

    const opts = {
        [type.insumoDetails.setData]: () => ({
            ...state,
            data: { ...action.payload.data },
            prices: { ...action.payload.prices },
        })
    };

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;

}