import React from 'react';


import { PaginaNuevoInsumo } from '../../Pages/PaginaNuevoInsumo';
import { NuevoInsumoMenuMobile } from '../Menus/NuevoInsumoMenuMobile';

export const NuevoInsumoContainer = () => {

    return (
        <div
            className="layout__page"
        >

            <PaginaNuevoInsumo />

            <NuevoInsumoMenuMobile />

        </div>
    )
}
