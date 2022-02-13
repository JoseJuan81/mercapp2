import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { PaginaLoading } from '../Pages/PaginaLoading.js';
import { Menu } from './Menus/Menu.js';
import { BackButton, ShoppingCarButton } from './Buttons/AppButtons.js';

import { pageTitles } from '../constant/pageTitles';
import {
    detalleComprasPath,
    detalleInsumoPath,
    mezclarComprasPath,
    misInsumosPath,
    nuevaCompraPath,
    resumenDeComprasPath,
    comprasEstadisticas
} from '../constant/routes.js';
import { equality, filter, isEmpty } from 'functionallibrary';

export const NavBar = () => {

    // ===== NAVIGATION =====
    const url = new URL( window.location );
    const { pathname } = useLocation();

    // ===== STORE =====
    const { loading } = useSelector( state => state.loading );

    // ====== STATE =====
    const [pageTitle, setPageTitle] = useState( '' );
    const [showMenu, setShowMenu] = useState( false );
    const [isBuyActive, setIsBuyActive] = useState( false );
    const [isMergingPurchases, setIsMergingPurchases] = useState( false );
    const [isPurchasesStatistics, setIsPurchasesStatistics] = useState( false );
    const [isPurchaseDetail, setIsPurchaseDetail] = useState( false );
    const [isInsumoDetail, setIsInsumoDetail] = useState( false );
    const [isInsumosPage, setIsInsumosPage] = useState( false );

    // ===== FUNCIONES PROPIAS =====
    const handleShowMenu = useCallback( ({ target }) => {

        if ( target.type === 'button' || target.className.includes( 'fa' ) ) {
            
            setShowMenu( sm => !sm );
        }
    },[])

    // VERIFICAR SI HAY UNA COMPRA ACTIVA
    useEffect(() => {

        if ( url.searchParams.get('activeBuy') ) {
            setIsBuyActive( true );
        }

    },[])

    // ESTABLECER VALORES EN FUNCION DE LA URL
    useEffect( () => {
 
        setPageTitle( pageTitles[pathname] || null );
        setIsMergingPurchases( pathname.includes( mezclarComprasPath ) );
        setIsPurchaseDetail( pathname.includes( detalleComprasPath ) );
        setIsInsumoDetail( pathname.includes( detalleInsumoPath ) );
        setIsPurchasesStatistics( pathname.includes( comprasEstadisticas ) );
        setIsInsumosPage( pathname.includes( misInsumosPath ) );

    }, [pathname]);

    if ( loading ) {
        return <PaginaLoading />
    }

    return (
        <div
            className="
                px-3
                border-b border-solid border-warmGray-200
                flex items-center justify-between
                fixed top-0 z-30
                w-screen h-16
                bg-white
            "
        >
            {isBuyActive && <BuyPageButton />}
            {isMergingPurchases && <BackToPurchases />}
            {isPurchasesStatistics && <BackToPurchases />}
            {isPurchaseDetail && <BackToPurchases />}
            {isInsumoDetail && <BackToInsumos />}

            <AppName />

            {pageTitle && <PageTitle pageTitle={ pageTitle } /> }

            {isInsumosPage && <CarButton />}

            <div
                className="
                    flex items-center
                "
            >

                <MenuButton
                    handleShowMenu={ handleShowMenu }
                />
                
                <Menu
                    showMenu={ showMenu }
                    handleShowMenu={ handleShowMenu }
                />
            </div>

        </div>
    )
}

const CarButton = () => {

    // ===== STORE ===== //
    const selectedInsumos = useSelector( store => filter( equality( 'selected', true ), store.insumos.data ));

    // ===== VARIABLES LOCALES ===== //
    const len = selectedInsumos.length;

    return (
        <ShoppingCarButton
            to={ nuevaCompraPath }
            className="
                relative
                text-lg
            "
        >
            { !isEmpty( selectedInsumos ) &&
                <div
                    className="
                        absolute -top-4 left-3
                        text-xs font-medium
                        bg-white
                        w-6 h-6 rounded-full
                        flex items-center justify-center
                        border-2 border-solid border-lime-500
                    "
                >{ len }</div>
            }
        </ShoppingCarButton>
    )
}

const AppName = React.memo( () => {
    return (
        <h1
            className="
                font-medium
                text-lime-500 text-base
            "
        >MercApp2</h1>
    )
})

const MenuButton = React.memo(({ handleShowMenu }) => {
    return (
        <button
            type="button"
            className="
                py-2 px-3
                text-base text-warmGray-800
                bg-warmGray-100
            "
            onClick={ handleShowMenu }
        >
            <i className="fas fa-bars"></i>
        </button>
    )
})

const PageTitle = React.memo( ({ pageTitle }) => {
    return (
        <h1
            data-cy="page-title"
            className="
                animate__animated animate__fadeInUp animate__delay-2s
                text-xl font-light
            "
        >{ pageTitle }</h1>
    )
})

const BuyPageButton = React.memo( () => {
    return (
        <BackButton
            className="
                btn-icon
                flex items-center justify-center
            "
            to={ nuevaCompraPath }
        />
    )
});

const BackToPurchases = React.memo( () => {
    return (
        <BackButton
            className="
                btn-icon
            "
            to={ resumenDeComprasPath }
        />
    )
});

const BackToInsumos = React.memo( () => {
    return (
        <BackButton
            className="
                btn-icon
                flex items-center justify-center
            "
            to={ misInsumosPath }
        />
    )
})
