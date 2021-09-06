import React from 'react';
import { useSelector } from 'react-redux';

import { PageLoading } from './PageLoading';
import { InsumoForm } from '../components/Form/InsumoForm';

export const PaginaNuevoInsumo = () => {

    const { loading: { loading } } = useSelector( state => state );

    return (
        <div
            className="
                animate__animated animate__bounceInUp animate__faster
                fixed top-0 left-0 z-20
                w-full h-full
                bg-black bg-opacity-70
                flex items-end justify-center
            "
        >
            { loading
                ? <PageLoading />
                : <InsumoForm />
            }      
        </div>
    )
}
