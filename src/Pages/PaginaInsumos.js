import React, { useCallback, useReducer, useState } from 'react';

import { insumoReducer, selectAllInsumos } from '../components/Insumos/insumoReducer';
import { ListadoInsumos } from '../components/Insumos/ListadoInsumos';
import { PageTitle } from '../components/Genericos/PageTitle';
import { Searcher } from '../components/Genericos/form/Searcher';
import { InsumosMenuMobile } from '../components/Insumos/InsumosMenuMobile';

import { setInLocalStorage, updateInsumosInLocalStorage } from '../helper/localStorage';
import { initReducer } from '../components/Insumos/initReducer';


export const PaginaInsumos = () => {

    const [showSearch, setShowSearch] = useState(false);

    const [insumosState, dispatch] = useReducer(insumoReducer, [], initReducer);


    const handleClickOnInsumo = (insumo) => {

        dispatch({ type: 'toogleCheck', payload: insumo });
        updateInsumosInLocalStorage(insumo);

    }

    const selectAll = useCallback( () => {

        dispatch({ type: 'selectAll', payload: insumosState });

        const allSelected = selectAllInsumos(insumosState);
        setInLocalStorage('selected-insumos', allSelected);
        
    }, [dispatch]);
    
    const unSelectAll = useCallback( () => {
        
        dispatch({ type: 'unSelectAll', payload: insumosState });
        setInLocalStorage('selected-insumos', []);

    }, [dispatch]);


    const searchingInsumos = (value) => {

        if (value) {

            dispatch({ type: 'search', payload: value });
            
        } else {
            
            dispatch({ type: 'reset', payload: initReducer() });

        }
    }

    return (
        <div className="px-2 mt-4 relative">
            
            <PageTitle title="Insumos" />

            <div
                className={`
                    flex
                    mb-4
                    overflow-hidden
                    ${showSearch ? 'max-h-20' : 'max-h-0'}
                    duration-300
                `}
            >
                <Searcher
                    onSearch={ searchingInsumos }
                />
            </div>

            <ListadoInsumos
                insumosState={ insumosState }
                handleClickOnInsumo={ handleClickOnInsumo }
            />

            <InsumosMenuMobile
                selectAll={ selectAll }
                unSelectAll={ unSelectAll }
                toogleShowSearch={ () => setShowSearch(s => !s) }
            />
            
        </div>
    )
}
