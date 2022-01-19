import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { appLogout } from '../../actions/authAction';
import { startLoadingInsumos } from '../../actions/insumosAction';

import { MENU_ROUTES } from '../../constant/defaults';
import { type } from '../../constant/type';

import { removeFromLocalStorage } from '../../helper/localStorage';

import { CloseButton, LogoutButton, RefreshButton } from '../Buttons/AppButtons';
import { UserAvatar } from '../UserAvatar';

export const Menu = ({ showMenu, handleShowMenu }) => {

    // ===== STORE =====
    const user = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // ===== FUNCIONES PROPIAS =====
    const handleLogout = useCallback(() => {

        dispatch( appLogout() );

    },[])

    const handleRefresh = useCallback(() => {

        removeFromLocalStorage( type.localStorage.insumos );
        dispatch( startLoadingInsumos() );

    },[])

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
                border border-solid border-warmGray-300 rounded-xl
                w-3/4 max-w-lg h-screen
                mt-1
                animate__animated
            `}
        >
            <MenuHeader
                user={ user }
                handleShowMenu={ handleShowMenu }
                handleRefresh={ handleRefresh }
            />

            {MENU_ROUTES.map(( route, ind ) => (
                
                <RouteButton route={ route } index={ ind } />

            ))}

            <LogOut onClick={ handleLogout } />

        </ul>
    )
}

const RouteButton = React.memo(({ route, index }) => {
    return (
        <li
            key={`${ route.name } - ${ index } `}
            className={`
                ${ index === 0 && 'border-t' }
                border-b border-solid border-warmGray-300
            `}
        >
            <NavLink
                activeClassName="
                    bg-warmGray-100 font-bold
                "
                className="
                    text-base text-warmGray-800
                    flex items-center
                    w-full
                "
                to={ route.to }
            >
                <p
                    className="
                        flex-auto
                        whitespace-nowrap
                        px-4 py-4
                    "
                >
                    <i className={ route.icon }></i>
                    { route.name }
                </p>
            </NavLink>
        </li>
    )
})

const MenuHeader = React.memo(({ user, handleRefresh, handleShowMenu }) => {
    return (
        <li
            key="primer"
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

                <RefreshButton
                    isButton
                    className="
                        text-xl text-warmGray-300
                    "
                    onClick={ handleRefresh }
                />
                

                <CloseButton
                    isButton
                    className="
                        text-4xl text-warmGray-800
                    "
                    type="button"
                    onClick={ handleShowMenu }
                />
            </div>

            <span
                className="
                    text-left text-warmGray-800
                "
            >{ user.name }</span>

        </li>
    )
})

const LogOut = React.memo(({ onClick }) => {
    return (
        <li
            key="ultimo"
            className="
                whitespace-nowrap
                fixed bottom-0
                w-full
            "
        >
            <LogoutButton
                isButton
                text="Cerrar sesion"
                className="
                    px-4 py-4
                    w-full
                    bg-warmGray-100
                    text-warmGray-600 font-regular text-xl
                "
                onClick={ onClick }
            />
        </li>
    )
})
