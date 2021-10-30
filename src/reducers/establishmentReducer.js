import { type } from "../constant/type";

export const establishmentReducer = ( state = [], action ) => {

    const opts = {
        [type.establishment.set]: () => [...action.payload]
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}