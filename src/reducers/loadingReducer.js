import { initState, loadingType } from "../constant/loading"

export const loadingReducer = ( state = initState, action ) => {

    const opts = {
        [loadingType.start]: () => ({ loading: true }),
        [loadingType.end]: () => initState
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}