import { equality, findIndex } from 'functionallibrary';

export const updateItemInArrayByProp = (prop, item, arr) => {
    const index = findIndex(
        equality(prop, item[prop]),
        arr
    )

    const local = [...arr];
    local.splice( index, 1, item );

    return local;
}