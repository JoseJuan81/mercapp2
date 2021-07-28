import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { misInsumosPath } from '../../constant/routes';
import { InsumoContext } from '../../context/Insumo/InsumoContext';

export const NavBar = () => {

    const { pathname } = useLocation();

    const [isPaginaInsumo, setIsPaginaInsumo] = useState( pathname === misInsumosPath );

    const { total } = useContext( InsumoContext );

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
                        <output>{ total }</output>
                    </div>
                }

                <button
                    type="button"
                    className="
                        icon-menu
                        py-2 px-3
                        text-base text-warmGray-500
                        bg-warmGray-100
                    "
                ></button>
            </div>

        </div>
    )
}
