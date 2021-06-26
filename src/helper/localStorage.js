import { equality, findIndex, setNewProperty } from 'functionallibrary';

export const getFromLocalStorage = (key) => {
    const ls = localStorage.getItem(key);
    return JSON.parse(ls);
}

export const setInLocalStorage = (key, data) => {
    const dParsed = JSON.stringify(data);
    localStorage.setItem(key, dParsed);
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const updateInsumosInLocalStorage = (insumo) => {
    const { checked, title } = insumo;
    const dataSelected = getFromLocalStorage('selected-insumos');

    if ( dataSelected && !checked) {

        // checked no esta actualizado
        const checkedInsumo = setNewProperty('checked', true, insumo);
        setInLocalStorage('selected-insumos', [checkedInsumo, ...dataSelected]);
        
    } else if (!checked) {
        
        const onlyCheckedInsumo = setNewProperty('checked', true, insumo);
        setInLocalStorage('selected-insumos', [onlyCheckedInsumo]);

    } else {

        const index = findIndex(
            equality('title', title),
            dataSelected
        );

        dataSelected.splice(index, 1);
        setInLocalStorage('selected-insumos', dataSelected);

    }

}