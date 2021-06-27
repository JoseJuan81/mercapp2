import { decide, equality, find, reduce } from 'functionallibrary';

import { data as dataInsumos } from '../../fakeData/insumos.json';

import { getFromLocalStorage } from '../../helper/localStorage';
import { alphabeticSorting } from '../../helper/alphabeticSorting';

export const initReducer = () => {
    const dataSelected = getFromLocalStorage('selected-insumos');

    if (!dataSelected || dataSelected.length === 0) {
        return alphabeticSorting(dataInsumos);
    }
    
    const reduceManage = (list, item) => {

        const isChecked = find( equality('title', item.title), dataSelected );

        const addChecked = () => list.concat(isChecked);
        const addNotChecked = (el) => list.concat(el);

        return decide(!!isChecked, addChecked, addNotChecked, item);

    }

    const updatedInsumos = reduce(reduceManage, [], dataInsumos);
    return alphabeticSorting(updatedInsumos);
}
