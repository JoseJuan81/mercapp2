import { insumosType } from "../constant/insumosType";

export const insumosReducer = ( state = [], action ) => {

    const opts = {
        [insumosType.add]: () => ([action.payload, ...state]),
        [insumosType.getAll]: () => [...state],
        [insumosType.set]: () => [...action.payload]
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state
}