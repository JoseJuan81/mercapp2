import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { appLogout } from '../../actions/auth';
import { startLoadingInsumos } from '../../actions/insumosAction';
import { typeLocal } from '../../constant/localStorage';
import { misInsumosPath, resumenDeComprasPath } from '../../constant/routes';
import { removeFromLocalStorage } from '../../helper/localStorage';
import { UserAvatar } from '../UserAvatar';

export const Menu = React.memo( ({ showMenu, handleShowMenu }) => {

    const user = useSelector( state => state.auth );
    
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch( appLogout() );

    }

    const handleRefresh = () => {

        removeFromLocalStorage( typeLocal.insumos );
        dispatch( startLoadingInsumos() );
    }

    useEffect( () => {

        const ulClass = document.querySelector('ul').classList;

        if (showMenu) {
            ulClass.add('block');
            ulClass.remove('hidden');

            ulClass.remove('animate__fadeOutRightBig');
            ulClass.add('animate__fadeInRightBig');
            
        } else {
            
            ulClass.remove('animate__fadeInRightBig');
            ulClass.add('animate__fadeOutRightBig');
        }

    }, [showMenu]);

    return (
        <ul
            className={`
                hidden
                fixed top-0 -right-3 z-50
                bg-white
                border-2 border-solid border-warmGray-300 rounded
                w-full h-screen
                mt-1
                shadow
                animate__animated
            `}
        >
            <li
                className="
                    flex flex-col
                    pl-4 pr-6 py-4 mb-3
                "
            >
                <div
                    className="
                        flex items-center justify-between
                    "
                >
                    <UserAvatar user={ user } />

                    <button
                        className="
                            text-3xl text-warmGray-500
                        "
                        type="button"
                        onClick={ handleRefresh }
                    >
                        <i className="fas fa-sync"></i>
                    </button>
                    

                    <button
                        className="
                            text-5xl text-warmGray-700
                        "
                        type="button"
                        onClick={ handleShowMenu }
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <span
                    className="
                        text-left text-warmGray-500
                        mt-4
                    "
                >{ user.name }</span>

            </li>
            <li
                className="
                    border-t border-solid border-warmGray-300
                "
            >
                <NavLink
                    className="
                        text-base text-warmGray-400
                        flex items-center
                        w-full
                    "
                    activeClassName="
                        text-warmGray-800 font-regular
                    "
                    to={ resumenDeComprasPath }
                >
                    <p
                        className="
                            flex-auto
                            whitespace-nowrap
                            px-4 py-4
                        "
                    >
                        <i className="fas fa-store mr-2"></i>
                        Mis compras
                    </p>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className="
                        font-light text-base text-warmGray-400
                    "
                    activeClassName="
                        text-warmGray-800 font-regular
                    "
                    to={ misInsumosPath }
                >
                    <p
                        className="
                            whitespace-nowrap
                            px-4 py-4
                            border-t border-b border-solid border-warmGray-300
                        "
                    >
                        <i className="fas fa-pepper-hot mr-2"></i>
                         Mis insumos
                    </p>
                </NavLink>
            </li>
            <li
                className="
                    whitespace-nowrap
                    fixed bottom-0
                    w-full
                "
            >
                <button
                    className="
                        px-4 py-4
                        w-full
                        bg-warmGray-100
                        text-warmGray-800 font-regular text-xl
                    "
                    onClick={ handleLogout }
                >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Cerrar sesion
                </button>
            </li>
        </ul>
    )
})
