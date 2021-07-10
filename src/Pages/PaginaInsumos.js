import React from 'react';

import { PageTitle } from '../components/Genericos/PageTitle';
import { InsumosContainer } from '../components/container/InsumosContainer';


export const PaginaInsumos = () => {

    return (
        <div className="px-2 pb-20 mt-4 relative">
            
            <PageTitle title="Insumos" />

            <InsumosContainer />
            
        </div>
    )
}
