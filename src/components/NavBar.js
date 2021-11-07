import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { PageLoading } from '../Pages/PageLoading.js';
import { Menu } from './Menus/Menu.js';
import { BackButton } from './Buttons/AppButtons.js';

import { pageTitles } from '../constant/pageTitles';
import { detalleComprasPath, mezclarComprasPath, nuevaCompraPath, resumenDeComprasPath } from '../constant/routes.js';

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
                flex items-center justify-center
            "
            to={ resumenDeComprasPath }
        />
    )
})

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
    const [isPurchaseDetail, setIsPurchaseDetail] = useState( false );

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

    }, [pathname]);

    if ( loading ) {
        return <PageLoading />
    }

    return (
        <div
            className="
                px-3
                h-16
                border-b border-solid border-warmGray-200
                flex items-center justify-between
                sticky top-0 z-10
                w-full
                bg-white
            "
        >
            {isBuyActive && <BuyPageButton />}
            {isMergingPurchases && <BackToPurchases />}
            {isPurchaseDetail && <BackToPurchases />}

            <AppName />

            {pageTitle && <PageTitle pageTitle={ pageTitle } /> }

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
