import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Menu } from './Menus/Menu.js';

import { pageTitles } from '../constant/pageTitles';

import {
    inicioPath,
} from '../constant/routes.js';

export const NavBar = () => {

    // ===== NAVIGATION =====
    const url = new URL( window.location );
    const { pathname } = useLocation();

    // ====== STATE =====
    const [pageTitle, setPageTitle] = useState( '' );
    const [showMenu, setShowMenu] = useState( false );

    // ===== FUNCIONES PROPIAS =====
    const handleShowMenu = useCallback( ({ target }) => {

        if ( target.type === 'button' || target.className.includes( 'fa' ) ) {
            
            setShowMenu( sm => !sm );
        }
    },[])

    // ESTABLECER VALORES EN FUNCION DE LA URL
    useEffect( () => {
 
        setPageTitle( pageTitles[pathname] || null );

    }, [pathname]);

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

const AppName = React.memo( () => {
    return (
        <Link
            className="
                font-medium
                text-lime-500 text-base
            "
            to={ inicioPath }
        >MercApp2</Link>
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
                text-lg
            "
        >{ pageTitle }</h1>
    )
})
