import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Menu } from './Menus/Menu.js';
import { pageTitles } from '../constant/pageTitles';


export const NavBar = () => {

    const { pathname } = useLocation();

    const [pageTitle, setPageTitle] = useState( '' );
    const [showMenu, setShowMenu] = useState( false );

    const handleShowMenu = ({ target }) => {

        if ( target.type === 'button' || target.className.includes( 'fa' ) ) {
            
            setShowMenu( sm => !sm );
        }
    }

    useEffect( () => {
 
        setPageTitle( pageTitles[pathname] || null );
    }, [pathname]);

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
            <h1
                className="
                    font-medium
                    text-lime-500 text-base
                ">
                    MercApp2
            </h1>

            {pageTitle && (
                <h1
                    data-cy="page-title"
                    className="
                        animate__animated animate__fadeInUp animate__delay-2s
                        text-xl font-light
                    "
                >{ pageTitle }</h1>
            )}

            <div
                className="
                    flex items-center
                "
            >

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
                
                <Menu
                    showMenu={ showMenu }
                    handleShowMenu={ handleShowMenu }
                />
            </div>

        </div>
    )
}
