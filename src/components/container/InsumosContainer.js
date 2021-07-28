import React, { useCallback, useContext, useEffect, useState } from 'react';

import { ListadoInsumos } from '../Insumos/ListadoInsumos';
import { Searcher } from '../Genericos/form/Searcher';
import { InsumosMenuMobile } from '../Insumos/InsumosMenuMobile';

import { BottomModal } from '../Genericos/modal/BottomModal';
import { InsumoForm } from '../Genericos/form/InsumoForm';
import { InsumoContext } from '../../context/Insumo/InsumoContext';
import { isEmpty } from 'functionallibrary';


export const InsumosContainer = () => {
    // console.log('3 INSUMO CONTAINER');

    // Contexto de Insumo
    const {
        filteringInsumos,
        insumoToUpdate,
        searchingInsumos,
        setInsumoToUpdate,
    } = useContext( InsumoContext );

    // variables para mostrar u ocultar buscadores
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // variables para mostrar u ocular modal
    const [showModal, setShowModal] = useState(false);

    // accion para cambiar valor de variables para mostrar u ocultar buscadores y modal
    const toogleShowSearch = useCallback( () => {

        setShowFilter(() => false);
        setShowSearch(s => !s);

    }, [setShowFilter, setShowSearch]);

    // accion para cambiar valor de variables para mostrar u ocultar buscadores y modal
    const toogleShowFilter = useCallback( () => {

        setShowSearch(() => false);
        setShowFilter(s => !s);

    }, [setShowSearch, setShowFilter]);

    const openModal = useCallback( () => setShowModal( true ), [setShowModal]);
    const closeModal = useCallback( () => {

        setShowModal( false );
        setInsumoToUpdate();
    }, [setShowModal]);

    useEffect( () => {

        setShowModal( !isEmpty( insumoToUpdate ) );
    }, [insumoToUpdate]);

    return (
        <>
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

            <ListadoInsumos />

            <InsumosMenuMobile
                toogleShowSearch={ toogleShowSearch }
                toogleShowFilter={ toogleShowFilter }
                openModal={ openModal }
            />


            { showModal &&
            
                <BottomModal show={ showModal } >

                    <InsumoForm closeModal={ closeModal } />

                </BottomModal>

            }

        </>
    )
}
