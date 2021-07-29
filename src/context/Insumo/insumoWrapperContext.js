import { useEffect, useState, useReducer } from 'react';
import { equality, find, removeItemFromArrayByProp } from 'functionallibrary';

import { InsumoContext } from './InsumoContext';

import { getFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';
import {
    updateItemInArrayById,
    selectAllInsumos,
    updateTotal,
    matchWithSelectedInsumos,
} from '../../helper/helperInsumoContext';
import { insumoReducer } from './insumoReducer';

const dataSelected = getFromLocalStorage('selected-insumos') || [];

/**
 * @description funcion wrapper del contexto
 * @param {ReactComponent} children
 */
export const InsumoStore = ({ children }) => {

    const [insumos, dispatch] = useReducer(insumoReducer, []);

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
        dispatch({ type: 'toogle', payload: newInsumo });

        // actualizar insumos seleccionados
        const updatedSelectedInsumos = newInsumo.checked
            ? [newInsumo, ...selectedInsumos]
            : removeItemFromArrayByProp('id', newInsumo.id, selectedInsumos);
        
        setSelectedInsumos( [...updatedSelectedInsumos] );

    };

    /**
     * @description: actualiza cantidad del insumo
     * @param {string} id 
     * @param {number} quantity 
     */
    const updateQuantityInSelectedInsumo = ( id, quantity ) => {
        const insumo = find( equality('id', id), insumos );

        dispatch({ type: 'quantity-change', payload: { ...insumo, quantity } });

        const updatedSelectedInsumos = updateItemInArrayById( selectedInsumos, { ...insumo, quantity } );
        setSelectedInsumos( updatedSelectedInsumos );

    };

    /**
     * @description: selecciona todos los insumos
     * @param {array} insumos - arreglo de insumos
     */
    const selectingAllInsumos = () => {

        const allSelected = selectAllInsumos(insumos);

        dispatch({ type: 'select-all', payload: allSelected });
        setSelectedInsumos([...allSelected]);

    };
    
    /**
     * @description: deselecciona todos los insumos
     * @param {array} insumos - arreglo de insumos
     */
    const unSelectingAllInsumos = () => {

        dispatch({ type: 'unselect-all' });
        setSelectedInsumos( [] );

    };

    /**
     * @description: Busca insumos usando el titulo
     * @param {string} searchVal - criterio de busqueda
     */
    const searchingInsumos = (searchVal) => {

        if(searchVal === '' || searchVal === null || searchVal === undefined) {

            const matching = matchWithSelectedInsumos( insumosCache );
            dispatch({ type: 'restore-insumos', payload: matching });
        } else {
            
            setInsumosCache( insumos );
            dispatch({ type: 'search', payload: searchVal });
        }
        
    };
    
    /**
     * @description: Busca insumos usando los labels
     * @param {string} searchVal - criterio de buscqueda
     */
    const filteringInsumos = (searchVal) => {
        
        if(searchVal === '' || searchVal === null || searchVal === undefined) {
            
            const matching = matchWithSelectedInsumos( insumosCache );
            dispatch({ type: 'restore-insumos', payload: matching });
        } else {

            setInsumosCache( insumos );
            dispatch({ type: 'filter', payload: searchVal });
        }

    };


    /**
     * @description agregar insumo nuevo al contexto
     * @param {object} newInsumo - nuevo insumo
     */
    const addingNewInsumo = (newInsumo) => {

        dispatch({ type: 'add', payload: newInsumo });
    };
    
    /**
     * 
     * @param {string} insumoId 
     */
    const deletingInsumo = (insumoId) => {
        
        dispatch({ type: 'remove', payload: insumoId });
    };

    /**
     * @TODO - enviar objeto completo
     * @param {strin} id 
     */
    const updatingInsumo = ( id ) => {

        const insumo = find( equality('id', id), insumos ) || {};
        setInsumoToUpdate( insumo );
    };

    /**
     * 
     * @param {object} insumo 
     */
    const updatingInsumoInContext = (insumo) => {

        dispatch({ type: 'update', payload: insumo });
    }

    // Total de insumos seleccionados => price * quantity
    useEffect( () => {

        setTotal(
            updateTotal( selectedInsumos )
        );
        
    }, [selectedInsumos]);

    // actualizar el localstorage con los seleccionados
    useEffect( () => {

        setInLocalStorage('selected-insumos', selectedInsumos);
        
    }, [selectedInsumos])

    const insumoContextProps = {
        addingNewInsumo,
        deletingInsumoFromContext: deletingInsumo,
        dispatch,
        filteringInsumos,
        insumos,
        insumoToUpdate,
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