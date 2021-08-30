import React, { useEffect, useState } from 'react';
import { round } from 'functionallibrary';
import { useLocation } from 'react-router-dom';

import { misInsumosPath } from '../../constant/routes';
import { Menu } from '../menu/Menu';

const twoDecimals = round(2);

export const NavBar = () => {

    const { pathname } = useLocation();

    const [showMenu, setShowMenu] = useState( false );
    const [isPaginaInsumo, setIsPaginaInsumo] = useState( pathname === misInsumosPath );

    const total = 123;

    const handleShowMenu = ({ target }) => {

        if ( target.type === 'button' ) {
            
            setShowMenu( sm => !sm );
        }
    }

    useEffect( () => {

        setIsPaginaInsumo( pathname === misInsumosPath );

    }, [pathname])

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
                    flex-auto
                    font-medium
                    text-lime-500 text-base
                ">
                    MercApp2
            </h1>

            <div
                className="
                    flex items-center
                "
            >

                <button
                    type="button"
                    className="
                        icon-menu
                        py-2 px-3
                        text-base text-warmGray-800
                        bg-warmGray-100
                    "
                    onClick={ handleShowMenu }
                >
                </button>
                
                <Menu
                    showMenu={ showMenu }
                    handleShowMenu={ handleShowMenu }
                />
            </div>

        </div>
    )
}
