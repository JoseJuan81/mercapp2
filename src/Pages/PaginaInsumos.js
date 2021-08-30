import React from 'react';
import { PageTitle } from '../components/PageTitle';

import { Insumo } from '../components/Insumos/Insumo';

export const PaginaInsumos = ({ insumos }) => {

    return (
        <>
            <PageTitle title="Mis Insumos" />
            <div
                className="
                    grid gap-4
                    self-start
                    w-full
                    px-2 pb-2
                "
            >
                {insumos.map( (insumo, index ) => (
                    <Insumo
                        key={ `${insumo}-${index}` }
                        insumo={ insumo }
                    />
                ))}
            </div>
        </>
    )
}
