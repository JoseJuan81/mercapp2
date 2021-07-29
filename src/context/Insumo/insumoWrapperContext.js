import { useEffect, useState, useReducer } from 'react';
import { equality, filter, find, removeItemFromArrayByProp } from 'functionallibrary';

import { InsumoContext } from './InsumoContext';

import { getFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';
import {
    updateTotal,
    matchWithSelectedInsumos,
} from '../../helper/helperInsumoContext';
import { insumoReducer } from './insumoReducer';

/**
 * @description funcion wrapper del contexto
 * @param {ReactComponent} children
 */
export const InsumoStore = ({ children }) => {

    const [insumos, dispatch] = useReducer(insumoReducer, []);

    const [insumosCache, setInsumosCache] = useState([]);
    const [total, setTotal] = useState(0);
    const [insumoToUpdate, setInsumoToUpdate] = useState({});

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
     * @TODO - enviar objeto completo
     * @param {strin} id 
     */
    const updatingInsumo = ( id ) => {

        const insumo = find( equality('id', id), insumos ) || {};
        setInsumoToUpdate( insumo );
    };

    useEffect( () => {

        const selected = filter( equality('checked', true), insumos);

        // actualizar total
        setTotal(
            updateTotal( selected )
        );

        // actualizar local storage
        setInLocalStorage('selected-insumos', selected);

    }, [insumos])

    const insumoContextProps = {
        dispatch,
        filteringInsumos,
        insumos,
        insumoToUpdate,
        searchingInsumos,
        setInsumoToUpdate,
        total,
        updatingInsumo,
    }

    return (
        <InsumoContext.Provider
            value={ insumoContextProps }
        >
            { children }

        </InsumoContext.Provider>
    )
}