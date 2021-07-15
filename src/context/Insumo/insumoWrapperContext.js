import { useEffect, useState } from 'react';
import { equality, find, removeItemFromArrayByProp } from 'functionallibrary';

import { InsumoContext } from './InsumoContext';

import { getFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';
import {
    onFilter,
    onSearch,
    updateItemInArrayById,
    selectAllInsumos,
    unSelectAllInsumos,
    updateTotal,
    updatingQuantity,
} from '../../helper/helperInsumoContext';

const dataSelected = getFromLocalStorage('selected-insumos') || [];

/**
 * @description funcion wrapper del contexto
 * @param {ReactComponent} children
 */
export const InsumoStore = ({ children }) => {

    const [insumos, setInsumos] = useState([]);
    const [insumosCache, setInsumosCache] = useState([]);
    const [selectedInsumos, setSelectedInsumos] = useState( dataSelected );
    const [total, setTotal] = useState(0);
    const [insumoToUpdate, setInsumoToUpdate] = useState({});


    /**
     * @description: seleccionar o deseleccionar un insumo
     * @param {object} newInsumo - insumo
     */
    const toogleCheck = (newInsumo) => {

        // Actualizar insumos
        setInsumos( i => updateItemInArrayById(i, newInsumo) );

        // actualizar insumos seleccionados
        const updatedSelectedInsumos = newInsumo.checked
            ? [newInsumo, ...selectedInsumos]
            : removeItemFromArrayByProp('id', newInsumo.id, selectedInsumos);
        
        setSelectedInsumos( [...updatedSelectedInsumos] );
        setInLocalStorage('selected-insumos', updatedSelectedInsumos);

    };

    /**
     * @description: actualiza cantidad del insumo
     * @param {string} id 
     * @param {number} quantity 
     */
    const updateQuantityInSelectedInsumo = (id, quantity) => {

        setSelectedInsumos( si => updatingQuantity( id, quantity, si ) );

    };

    /**
     * @description: selecciona todos los insumos
     * @param {array} insumos - arreglo de insumos
     */
    const selectingAllInsumos = () => {

        const allSelected = selectAllInsumos(insumos);

        setInsumos( allSelected );
        setSelectedInsumos([...allSelected]);
        setInLocalStorage('selected-insumos', allSelected);

    };
    
    /**
     * @description: deselecciona todos los insumos
     * @param {array} insumos - arreglo de insumos
     */
    const unSelectingAllInsumos = () => {
        
        const allUnSelected = unSelectAllInsumos( insumos );

        setInsumos( allUnSelected );
        setSelectedInsumos( [] );
        setInLocalStorage( 'selected-insumos', [] );

    };

    /**
     * @description: Busca insumos usando el titulo
     * @param {string} searchVal - criterio de busqueda
     */
    const searchingInsumos = (searchVal) => {

        if(searchVal === '' || searchVal === null || searchVal === undefined) {

            setInsumos( insumosCache );
        } else {

            setInsumosCache( insumos );

            const result = onSearch( insumos, searchVal );
            setInsumos( result );

        }

    };

    /**
     * @description: Busca insumos usando los labels
     * @param {string} searchVal - criterio de buscqueda
     */
    const filteringInsumos = (searchVal) => {

        if(searchVal === '' || searchVal === null || searchVal === undefined) {

            setInsumos( insumosCache );
        } else {

            setInsumosCache( insumos );

            const result = onFilter( insumos, searchVal );
            setInsumos( result );
        }

    };


    /**
     * @description agregar insumo nuevo al contexto
     * @param {object} newInsumo - nuevo insumo
     */
    const addingNewInsumo = (newInsumo) => {

        setInsumos( i => [{ ...newInsumo }, ...i] );
    };

    const deletingInsumo = (insumoId) => {

        setInsumos(
            removeItemFromArrayByProp('id', insumoId, insumos)
        );
    };

    const updatingInsumo = ( id ) => {

        const insumo = find( equality('id', id), insumos ) || {};
        setInsumoToUpdate( insumo );
    };

    const updatingInsumoInContext = (insumo) => {
        setInsumos( i => updateItemInArrayById(i, insumo) );
    }

    // Total de insumos seleccionados => price * quantity
    useEffect( () => {

        setTotal(
            updateTotal( selectedInsumos )
        );
        
    }, [selectedInsumos])

    const insumoContextProps = {
        addingNewInsumo,
        deletingInsumo,
        filteringInsumos,
        insumos,
        insumoToUpdate,
        setInsumosInCache: setInsumosCache,
        setInsumosInContext: setInsumos,
        searchingInsumos,
        selectedInsumos,
        selectingAllInsumos,
        setInsumoToUpdate,
        total,
        toogleCheck,
        unSelectingAllInsumos,
        updatingInsumo,
        updatingInsumoInContext,
        updateQuantityInSelectedInsumo,
    }

    return (
        <InsumoContext.Provider
            value={ insumoContextProps }
        >
            { children }

        </InsumoContext.Provider>
    )
}