import React from 'react'
import { useSelector } from 'react-redux'
import { Searcher } from '../Form/Searcher'

export const SearchAndFilterComponent = () => {

    const { showField, isSearching, isFiltering } = useSelector( state => state.search );

    return (
        <div
            className={`
                w-full
                overflow-hidden
                duration-700 delay-200
                mb-4 px-2
                ${ showField ? 'min-h-12' : 'min-h-0' }
            `}
        >
            {isSearching &&
                <div
                    className="
                        animate__animated animate__slideInDown
                    "
                >
                    <Searcher
                        placeholder="Buscar insumo"
                    />
                </div>

            }

            {isFiltering &&
                <div
                    className="
                        animate__animated animate__slideInDown
                    "
                >
                    <Searcher
                        placeholder="Filtrar insumos"
                    />
                </div>

            }
        </div>
    )
}
