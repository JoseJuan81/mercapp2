import React from 'react';

import { Insumo } from '../components/Insumos/Insumo';
import { SearchAndFilterComponent } from '../components/Insumos/SearchAndFilterComponent';

export const PaginaInsumos = ({ insumos }) => {

    return (
        <>
            <SearchAndFilterComponent />

            <div
                className="
                    grid gap-2
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
