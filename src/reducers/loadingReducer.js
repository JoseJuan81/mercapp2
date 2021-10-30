import { type } from "../constant/type";

export const initState = { loading: false };

export const loadingReducer = ( state = initState, action ) => {

    const opts = {
        [type.loading.start]: () => ({ loading: true }),
        [type.loading.end]: () => initState
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}