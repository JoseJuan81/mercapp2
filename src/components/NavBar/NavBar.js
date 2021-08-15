import React, { useEffect, useState } from 'react';
import { round } from 'functionallibrary';
import { Link, useLocation } from 'react-router-dom';

import { misInsumosPath, listaDeComprasPath } from '../../constant/routes';
import { logout } from '../../actions/auth';
import { useDispatch } from 'react-redux';

const twoDecimals = round(2);

export const NavBar = () => {

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const [showMenu, setShowMenu] = useState( false );
    const [isPaginaInsumo, setIsPaginaInsumo] = useState( pathname === misInsumosPath );

    const total = 123;

    const handleShowMenu = ({ target }) => {

        if ( target.type === 'button' ) {
            
            setShowMenu( sm => !sm );
        }
    }

    const handleLogout = () => {

        dispatch( logout() );

    }

    useEffect( () => {

        setIsPaginaInsumo( pathname === misInsumosPath );

    }, [pathname])

    return (
        <div
            className="
                py-3 px-3
                shadow
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
                {total > 0 && isPaginaInsumo &&
                    <Link
                        to="/lista-de-compras"
                        className="
                        py-2 px-3
                        text-base text-lime-500
                        bg-warmGray-100
                        rounded
                        icon-cart
                        "
                    ></Link>
                }

                {total > 0 &&
                    <div
                        className="
                            text-lg font-bold
                            text-warmGray-600
                            mx-4
                        "
                    >
                        <small className="text-xs">S/.</small>
                        <output>{ twoDecimals( total ) }</output>
                    </div>
                }

                <button
                    type="button"
                    className="
                        icon-menu
                        relative
                        py-2 px-3
                        text-base text-warmGray-500
                        bg-warmGray-100
                    "
                    onClick={ handleShowMenu }
                >
                    <ul
                        className={`
                            absolute top-full right-0
                            bg-white
                            border border-solid border-warmGray-400
                            mt-1
                            shadow
                            duration-200
                            transform ${ showMenu ? 'translate-x-2' : 'translate-x-44' } 
                        `}
                    >
                        <li
                            className="
                                whitespace-nowrap
                                px-3 py-2
                            "
                        >
                            <Link to={ listaDeComprasPath }>Mis compras</Link>
                        </li>
                        <li
                            className="
                                whitespace-nowrap
                                px-3 py-2
                            "
                        >
                            <Link to={ misInsumosPath }>Mis insumos</Link>
                        </li>
                        <li
                            className="
                                whitespace-nowrap
                                px-3 py-2
                            "
                        >
                            <buttom
                                onClick={ handleLogout }
                            >
                                Cerrar sesion
                            </buttom>
                        </li>
                    </ul>
                </button>
            </div>

        </div>
    )
}
