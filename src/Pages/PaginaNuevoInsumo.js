import React from 'react';

import { InsumoForm } from '../components/Form/InsumoForm';

export const PaginaNuevoInsumo = () => {

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
            <InsumoForm />   
        </div>
    )
}
