import React, { useContext } from 'react';
import { InsumoContext } from '../../context/InsumoContext';

export const NavBar = () => {

    const { total } = useContext(InsumoContext);

    return (
        <div
            className="
                py-4 px-3
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
                    text-lime-500 text-xl
                ">MercApp2</h1>

            {total > 0 &&
                <div
                    className="
                        text-base font-medium
                        text-warmGray-600
                    "
                >
                    <small className="text-xs">S/.</small>
                    <output>{ total }</output>
                </div>
            }
        </div>
    )
}
