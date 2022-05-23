import React from 'react';
import { useSelector } from 'react-redux';

import { PaginaLoadingListaCompras } from '../../../Pages/loading/PaginaLoadingListaCompras';
import { PaginaListadoCompras } from '../../../Pages/Purchases/PaginaListadoCompras';

import { ListadoComprasMenuMobile } from '../../Menus/ListadoComprasMenuMobile';


export const ListaComprasContainer = () => {

    // STORE
    const { loading } = useSelector( store => store.loading );

    return (
        <div className="layout__page">

            {loading
            ? <PaginaListadoCompras />
            : <PaginaLoadingListaCompras />}

            <ListadoComprasMenuMobile />

        </div>
    )
}
