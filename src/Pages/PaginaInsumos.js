import { isEmpty } from 'functionallibrary';
import React from 'react';
import { useSelector } from 'react-redux';

import { InsumoBase } from '../components/Insumos/Insumo';
import { SearchAndFilterComponent } from '../components/Insumos/SearchAndFilterComponent';

const NotFoundInsumos = () => {
    return (
        <h1
            className="
                text-2xl font-bold
            "
        >No se consiguieron Insumos</h1>
    )
}

export const PaginaInsumos = ({ insumos }) => {

    const {
        search: { isFiltering, isSearching}
    } = useSelector( state => state );

    return (
        <>
            <SearchAndFilterComponent />

            <div
                data-cy="PaginaInsumos"
                className="
                    grid gap-2
                    self-start
                    w-full
                    px-2 pb-2
                "
            >
                { isEmpty( insumos ) && ( isFiltering || isSearching ) &&
                    <NotFoundInsumos />
                }

                {insumos.map( (insumo, index ) => (
                    <InsumoBase
                        key={ `${insumo}-${index}` }
                        insumo={ insumo }
                    />
                ))}
            </div>
        </>
    )
}
