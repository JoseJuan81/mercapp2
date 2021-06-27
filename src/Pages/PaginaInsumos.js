import React, { useCallback, useReducer, useState } from 'react';

import { insumoReducer, selectAllInsumos } from '../components/Insumos/insumoReducer';
import { ListadoInsumos } from '../components/Insumos/ListadoInsumos';
import { PageTitle } from '../components/Genericos/PageTitle';
import { Searcher } from '../components/Genericos/form/Searcher';
import { InsumosMenuMobile } from '../components/Insumos/InsumosMenuMobile';

import { setInLocalStorage, updateInsumosInLocalStorage } from '../helper/localStorage';
import { initReducer } from '../components/Insumos/initReducer';


export const PaginaInsumos = () => {

    // mostrar u ocultar buscadores
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // manejador del estado de los insumos
    const [insumosState, dispatch] = useReducer(insumoReducer, [], initReducer);


    const handleClickOnInsumo = (insumo) => {

        dispatch({ type: 'toogleCheck', payload: insumo });
        updateInsumosInLocalStorage(insumo);

    }

    const selectAll = useCallback( (insumos) => {

        dispatch({ type: 'selectAll', payload: insumos });

        const allSelected = selectAllInsumos(insumos);
        setInLocalStorage('selected-insumos', allSelected);
        
    }, []);
    
    const unSelectAll = useCallback( (insumos) => {
        
        dispatch({ type: 'unSelectAll', payload: insumos });
        setInLocalStorage('selected-insumos', []);

    }, []);


    const searchingInsumos = (value) => {

        if (value) {

            dispatch({ type: 'search', payload: value });
            
        } else {
            
            dispatch({ type: 'reset', payload: initReducer() });

        }
    };

    const filteringInsumos = (value) => {

        if (value) {

            dispatch({ type: 'filter', payload: value });
            
        } else {
            
            dispatch({ type: 'reset', payload: initReducer() });

        }
    };

    const toogleShowSearch = useCallback( () => {

        setShowFilter(false);
        setShowSearch(s => !s);

    }, []);

    const toogleShowFilter = useCallback( () => {

        setShowSearch(false);
        setShowFilter(s => !s);

    }, []);

    return (
        <div className="px-2 pb-20 mt-4 relative">
            
            <PageTitle title="Insumos" />

            <div
                className={`
                    flex
                    mb-4
                    overflow-hidden
                    ${showSearch || showFilter ? 'max-h-20' : 'max-h-0'}
                    duration-300
                `}
            >
                {
                    showSearch && <Searcher
                        onSearch={ searchingInsumos }
                        placeholder="Buscar insumo"
                    />
                }
                {
                    showFilter && <Searcher
                        onSearch={ filteringInsumos }
                        placeholder="Filtrar insumo"
                    />
                }

            </div>

            <ListadoInsumos
                insumosState={ insumosState }
                handleClickOnInsumo={ handleClickOnInsumo }
            />

            <InsumosMenuMobile
                insumos={ insumosState }
                selectAll={ selectAll }
                unSelectAll={ unSelectAll }
                toogleShowSearch={ toogleShowSearch }
                toogleShowFilter={ toogleShowFilter }
            />
            
        </div>
    )
}
