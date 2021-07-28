import React, { useContext, useEffect } from 'react';


import { useIdbInsumos } from '../hooks/useIdbInsumos';

import { PageTitle } from '../components/Genericos/PageTitle';
import { InsumosContainer } from '../components/container/InsumosContainer';

import { matchWithSelectedInsumos } from '../helper/helperInsumoContext';
import { InsumoContext } from '../context/Insumo/InsumoContext';


export const PaginaInsumos = () => {
    console.log('2 PAGINA INSUMOS');

    const { insumos, loading } = useIdbInsumos();

    const { dispatch } = useContext( InsumoContext );

    useEffect(() => {

        if (!loading) {

            const matching = matchWithSelectedInsumos( insumos );
            dispatch({ type: 'update-with-local-storage', payload: matching });
        }
        
    }, [loading])

    return (
        <div className="px-2 pb-20 mt-4 relative">
            
            <PageTitle title="Insumos" />

            {
                loading
                    ? <h1>Cargando...</h1>
                    : <InsumosContainer />
            }
            
            
        </div>
    )
}
