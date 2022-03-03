import { isEmpty, round } from 'functionallibrary';
import React, { useEffect, useState } from 'react';

import ParetoBarChart from '../helper/paretoInsumosChart';

import { extractAndOrderInsumos } from '../helper/extractAndOrderInsumos';
import { getTotalAmountAndTotalInsumos } from '../helper/getTotalAmountAndTotalInsumos';

const TWODECIMALS = round( 2 );

export const PaginaEstadisticasCompras = ({ purchases, currency = 'S/.' }) => {

    // ===== STATE =====
    const [width, setWidth] = useState( window.innerWidth );

    // ===== VARIABLES LOCALES =====
    const { totalInsumos, totalAmount } = getTotalAmountAndTotalInsumos( purchases );
    const {
        insumos:allInsumosOrdered,
        expensive,
        expense
    } = extractAndOrderInsumos( purchases );


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

        if ( !isEmpty( allInsumosOrdered ) ) {

            const container = document.querySelector('#d3-pareto__insumos');

            ParetoBarChart.init( container, {
                data: allInsumosOrdered,
                prop: 'total',
                margin: { top: 20, right: 15, bottom: 10, left: 25 },
                width
            });
        }

    }, [width, allInsumosOrdered])

    return (
        <div>

            <div
                className="
                    my-4 px-2 mx-auto
                    grid grid-cols-2 gap-3
                    text-center
                    max-w-md
                "
            >
                <CardDescriptor
                    label="Compras"
                    data={ purchases.length }
                />
                <CardDescriptor
                    userClass="animate__delay-1s"
                    label="Insumos" data={ totalInsumos }
                />
                <CardDescriptor
                    userClass="animate__delay-2s col-span-2"
                    label={ `Total ${currency}` }
                    data={ totalAmount }
                />
                <CardExpensive
                    userClass="animate__delay-3s col-span-2"
                    label="Mas costoso"
                    name={ expensive.name }
                    amount={ TWODECIMALS(expensive.total / expensive.quantity ) }
                />
                <CardExpensive
                    userClass="animate__delay-4s col-span-2"
                    label="Gaste mas"
                    name={ expense.name }
                    amount={ TWODECIMALS( expense.total ) }
                />
                
            </div>

            <div id="d3-pareto__insumos" className="pb-5"></div>
        </div>
    )
}

const CardDescriptor = ({ label, data, userClass = "" }) => {

    return (
        <div
            className={`
                ${ userClass }
                animate__animated animate__bounceInLeft
                border border-solid border-warmGray-200 rounded-lg
                pl-2 pr-4 py-1
                flex items-end justify-between
                h-12
            `}
        >
            <label
                className="
                    text-warmGray-400 font-bold text-sm text-left
                "
            >{ label }</label>
            <span
                className="
                    text-lime-500 font-bold text-4xl text-right
                    transform translate-y-1
                "
            >{ data }</span>
        </div>
    )
}

const CardExpensive = ({ label, name, amount, userClass }) => {

    return (
        <div
            className={`
                ${ userClass }
                animate__animated animate__bounceInLeft
                border border-solid border-warmGray-200 rounded-lg
                pl-2 pr-4 py-2
                flex flex-col
                relative
            `}
        >
            <span
                className="
                text-warmGray-500 font-bold text-xl text-left
                "
            >{ name }</span>
            <div className="flex items-end justify-between">
                <label
                    className="
                        text-rose-500 font-bold text-lg text-left
                    "
                >{ label }</label>
                <span
                    className="
                        text-rose-500 font-bold text-4xl text-right
                        bg-rose-50
                        rounded
                        px-3 py-1
                    "
                >
                    { amount }
                </span>
            </div>

            <i
                class="
                    fas fa-exclamation-circle
                    text-rose-700
                    absolute -top-2 -left-1
                "
            ></i>

        </div>
    )
}
