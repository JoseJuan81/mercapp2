import { createContext, useEffect, useMemo, useState } from 'react';
import { removeItemFromArrayByProp } from 'functionallibrary';

import { useIndexDB } from '../hooks/useIndexDB';

import { getFromLocalStorage, setInLocalStorage } from '../helper/localStorage';
import {
    initialInsumos,
    onFilter,
    onSearch,
    updateItemInArrayById,
    selectAllInsumos,
    unSelectAllInsumos,
    updateTotal,
    updatingQuantity,
} from '../helper/helperInsumoContext';

/**
 * Crear contexto de Insumo
 */
export const InsumoContext = createContext(null);

const dataSelected = getFromLocalStorage('selected-insumos') || [];

/**
 * @description funcion wrapper del contexto
 * @param {ReactComponent} children
 */
export const InsumoStore = ({ children }) => {

    // obtener insumos de indexDB
    const {
        deleteInsumo,
        insumos: insumosInLocalBD,
        setNewInsumo
    } = useIndexDB();


    // Ordenar insumos provenientes de indexDB y actualizarlos con los seleccionados
    const initInsumos = useMemo( () => initialInsumos( insumosInLocalBD ), [insumosInLocalBD] );

    const [insumos, setInsumos] = useState(initInsumos);
    const [selectedInsumos, setSelectedInsumos] = useState(dataSelected);
    const [total, setTotal] = useState(0);


    /**
     * @description: seleccionar o deseleccionar un insumo
     * @param {object} newInsumo - insumo
     */
    const toogleCheck = (newInsumo) => {

        // Actualizar insumos
        setInsumos(
            updateItemInArrayById(insumos, newInsumo)
        )

        // actualizar insumos seleccionados
        const updatedSelectedInsumos = newInsumo.checked
            ? [newInsumo, ...selectedInsumos]
            : removeItemFromArrayByProp('id', newInsumo.id, selectedInsumos);
        
        setSelectedInsumos( [...updatedSelectedInsumos] );
        setInLocalStorage('selected-insumos', updatedSelectedInsumos);


    }

    /**
     * @description: actualiza cantidad del insumo
     * @param {string} id 
     * @param {number} quantity 
     */
    const updateQuantityInSelectedInsumo = (id, quantity) => {

        setSelectedInsumos(
            updatingQuantity( id, quantity, selectedInsumos )
        );

    }

    /**
     * @description: selecciona todos los insumos
     * @param {array} insumos - arreglo de insumos
     */
    const selectingAllInsumos = (insumos) => {

        const allSelected = selectAllInsumos(insumos);

        setInsumos( allSelected );
        setSelectedInsumos([...allSelected]);
        setInLocalStorage('selected-insumos', allSelected);
    }
    
    /**
     * @description: deselecciona todos los insumos
     * @param {array} insumos - arreglo de insumos
     */
    const unSelectingAllInsumos = () => {
        
        const allUnSelected = unSelectAllInsumos( initialInsumos() );

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

            setInsumos( initialInsumos() );
        } else {

            const result = onSearch( insumos, searchVal );
            setInsumos( result );
        }

    }

    /**
     * @description: Busca insumos usando los labels
     * @param {string} searchVal - criterio de buscqueda
     */
    const filteringInsumos = (searchVal) => {

        if(searchVal === '' || searchVal === null || searchVal === undefined) {

            setInsumos( initialInsumos() );
        } else {

            const result = onFilter( insumos, searchVal );
            setInsumos( result );
        }

    }

    const addingNewInsumo = async (newInsumo) => {

        try {

            await setNewInsumo( newInsumo );
            setInsumos( i => [{ ...newInsumo }, ...i] );

        } catch(err) {
            console.log('Erro al crear insumo', err);
        }

    }

    const deletingInsumo = async (insumoId) => {

        await deleteInsumo(insumoId);

        setInsumos(
            removeItemFromArrayByProp('id', insumoId, insumos)
        );
    }

    // Total de insumos seleccionados => price * quantity
    useEffect( () => {

        setTotal(
            updateTotal( selectedInsumos )
        );
        
    }, [selectedInsumos])

    useEffect( () => {

        setInsumos(initInsumos);

    }, [initInsumos])

    const insumoContextProps = {
        addingNewInsumo,
        deletingInsumo,
        selectingAllInsumos,
        filteringInsumos,
        insumos,
        unSelectingAllInsumos,
        searchingInsumos,
        selectedInsumos,
        total,
        toogleCheck,
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