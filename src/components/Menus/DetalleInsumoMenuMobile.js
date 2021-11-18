import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { misInsumosPath } from '../../constant/routes';
import { BackButton, InfoButton, MoneyHandButton, PriceStatisticsButton } from '../Buttons/AppButtons';

export const DetalleInsumoMenuMobile = () => {

    // ===== NAVIGATION =====
    const url = new URL( window.location );
    const insumoId = url.searchParams.get( 'insumoId' );
    const history = useHistory();

    // ===== STATE =====
    const [insumoBaseRoute, setInsumoBaseRoute] = useState('');

    // construir insumoBaseRoute
    useEffect(() => {

        setInsumoBaseRoute( url.pathname + '?insumoId=' + insumoId );

    },[insumoId, url.pathname])

    return (
        <div
            className="
                fixed bottom-0 left-0
                w-full h-16
                grid grid-cols-4
                z-30
                bg-white
            "
        >

            <BackButton
                isButton
                className="
                    flex items-center justify-center
                "
                onClick={ () => history.push( misInsumosPath ) }
            />

            <InfoButton
                className={`
                    flex items-center justify-center
                    ${ url.searchParams.get( 'data' ) && 'text-lime-500' }
                `}
                to={ insumoBaseRoute + '&data=true' }
            />

            <MoneyHandButton
                className={`
                    flex items-center justify-center
                    ${ url.searchParams.get( 'prices' ) && 'text-lime-500' }
                `}
                to={ insumoBaseRoute + '&prices=true' }
            />
            <PriceStatisticsButton
                className={`
                    flex items-center justify-center
                    ${ url.searchParams.get( 'statistics' ) && 'text-lime-500' }
                `}
                to={ insumoBaseRoute + '&statistics=true' }
            />

        </div>
    )
}
