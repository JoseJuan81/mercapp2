import { establishmentType } from "../constant/establishments"

export const establishmentReducer = ( state = [], action ) => {

    const opts = {
        [establishmentType.set]: () => [...action.payload]
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}