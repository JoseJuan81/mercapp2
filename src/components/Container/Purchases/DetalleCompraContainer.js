import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { unSelectAllPurchases } from '../../../actions/purchasesAction';
import { startDeletingPurchase, startLoadingPurchaseDetails } from '../../../actions/purchasesDetailsAction';
import { resumenDeComprasPath } from '../../../constant/routes';

import { PaginaLoadingPaginaDetalleCompra } from '../../../Pages/loading/PaginaLoadingPaginaDetalleCompra';
import { PaginaDetalleCompra } from '../../../Pages/Purchases/PaginaDetalleCompra';
import { BaseButton } from '../../Buttons/AppButtons';

import { DetalleCompraMenuMobile } from '../../Menus/DetalleCompraMenuMobile';
import { BottomModal } from '../../Modal/BottomModal';

export const DetalleCompraContainer = () => {

    // ===== NAVIGATOR =====
    const url = new URL( window.location );

    // ===== STORE =====
    const dispatch = useDispatch();
    const { loading } = useSelector( store => store.loading );
    const { selected } = useSelector( store => store.purchases );

    // ===== STATE =====
    const [showDeleting, setShowDeleting] = useState( false );

    // ===== VARIABLES LOCALES =====
    const purchase = selected[0];

    // ===== FUNCIONES PROPIAS =====
    const onDeletingPurchase = () => {

        const id = url.searchParams.get('id');
        dispatch( startDeletingPurchase( id ) );

        setShowDeleting( false );

    }

    // API en caso selected no exista ( ej. al recargar pantalla )
    useEffect(() => {
        const id = url.searchParams.get('id');

        if ( !purchase && id ) {
            dispatch( startLoadingPurchaseDetails( id ) );
        }

    },[]);

    // Limpiar newPurchase.seleted del store al salir de la pantalla
    useEffect(() => {
        return () => {
            dispatch( unSelectAllPurchases() );
        }
    },[])

    if ( loading ) {
        return <PaginaLoadingPaginaDetalleCompra />
    }

    if ( !purchase ) {
        return (
            <div
                className="
                    flex flex-col justify-center items-center
                    h-full
                "
            >
                <h1
                    className="
                        text-2xl text-bold
                        mb-5
                    "
                >
                    Compra no disponible
                </h1>
                <BaseButton
                    to={ resumenDeComprasPath }
                    className="
                        px-8 py-3
                        rounded
                        text-xl text-warmgray-800 font-semibold
                        bg-warmGray-200
                    "
                >
                    Regresar
                </BaseButton>
            </div>
        )
    }

    return (
        <div
            className="layout__page"
        >
            <PaginaDetalleCompra details={ purchase } />

            <DetalleCompraMenuMobile
                deleteAction={ () => setShowDeleting( true ) }
            />

            {/* MODALES */}
            <BottomModal show={ showDeleting }>
                <ConfirmDeletingPurchase
                    close={ () => setShowDeleting( false ) }
                    accept={ onDeletingPurchase }
                />
            </BottomModal>

        </div>
    )
}

const ConfirmDeletingPurchase = ({ close, accept }) => {
    return (
        <div
            className="
                mt-4
            "
        >
            <h1
                className="
                    text-rose-500 font-semibold text-2xl
                "
            > ??seguro que quiere eliminar la actual compra?
            </h1>
            <p
                className="
                    my-4
                    text-center text-lg
                "
            >
                ?????? esta accion no puede deshacerse ??????
            </p>
            <div
                className="
                    flex items-center justify-center
                    mt-8
                "
            >
                <BaseButton
                    isButton
                    className="
                        mx-2 px-2 py-3
                        w-full
                        rounded
                        text-base text-warmgray-800 font-semibold
                        bg-warmGray-200
                    "
                    onClick={ close }
                >Cancelar
                </BaseButton>
                <BaseButton
                    isButton
                    className="
                        mx-2 px-2 py-3
                        w-full
                        rounded
                        text-base text-warmgray-800 font-semibold
                        bg-white
                    "
                    onClick={ accept }
                >Aceptar
                </BaseButton>
            </div>
        </div>
    )
}
