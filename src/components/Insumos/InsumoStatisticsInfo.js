import React, { useEffect, useState } from 'react';

import BarChart from '../../helper/barChart';

export const InsumoStatisticsInfo = ({ historyPrices, name }) => {

    // ===== STATE =====
    const [width, setWidth] = useState( window.innerWidth );

    // ===== FUNCIONES =====
    const getScreenWidth = () => {
        
        setWidth( window.innerWidth );
    }

    // ESCUCHAR CAMBIOS DE DIMENSION EN PANTALLA
    useEffect(() => {
        window.addEventListener( 'resize', getScreenWidth )
        return () => {
            window.removeEventListener( 'resize', getScreenWidth )
        }
    }, [width])

    // CREAR GRAFICO EN FUNCION DEL ANCHO DE LA PANTALLA
    useEffect(() => {

        if ( historyPrices ) {

            const container = document.querySelector('#d3-container');
            BarChart.init( container, {
                data: historyPrices,
                margin: { top: 22, right: 10, bottom: 10, left: 20 },
                width
            });
        }

    }, [width, historyPrices])

    return (
        <div
            className="
                animate__animated animate__fadeInLeft
            "
        >
            <h1
                className="
                    text-center text-3xl font-bold
                "
            >
                { name }
            </h1>
            <h2
                className="
                    text-center text-xl font-bold text-warmGray-400
                    mb-4
                "
            >
                Variacion de precios
            </h2>
            <div id="d3-container"></div>
        </div>
    )
}
