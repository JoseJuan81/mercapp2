import React from 'react';
import { useSelector } from 'react-redux';

import { LoadingListaCompras } from '../../Pages/loading/LoadingListaCompras';
import { PaginaListadoCompras } from '../../Pages/PaginaListadoCompras';
import { ListadoComprasMenuMobile } from '../Menus/ListadoComprasMenuMobile';


export const ListaComprasContainer = () => {

    // STORE
    const { loading } = useSelector( store => store.loading );

    if ( loading ) {
        return <LoadingListaCompras />
    }

    return (
        <div
            className="layout__page"
        >

            <PaginaListadoCompras />

            <ListadoComprasMenuMobile />

        </div>
    )
}
