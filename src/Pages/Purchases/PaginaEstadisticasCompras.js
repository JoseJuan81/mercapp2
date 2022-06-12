import { isEmpty, round } from 'functionallibrary';
import React, { useEffect, useState } from 'react';

import ParetoBarChart from '../../helper/paretoInsumosChart';
import { extractAndOrderInsumos } from '../../helper/extractAndOrderInsumos';
import { getTotalAmountAndTotalInsumos } from '../../helper/getTotalAmountAndTotalInsumos';
import { getRangeOfDatesFromPurchases } from '../../helper/dates';

import { ChartButton, ListButton } from '../../components/Buttons/AppButtons';
import { InsumosBuyedList } from '../../components/Tables/InsumosBuyedList';

const TWODECIMALS = round( 2 );

export const PaginaEstadisticasCompras = ({ purchases, currency = 'S/.' }) => {

    // ===== STATE =====
    const [showChart, setShowChart] = useState(false)

    // ===== VARIABLES LOCALES =====
    const { totalInsumos, totalAmount } = getTotalAmountAndTotalInsumos( purchases );
    const {
        insumos:allInsumosOrdered,
        expensive,
        expense
    } = extractAndOrderInsumos( purchases );
    const dates = getRangeOfDatesFromPurchases( purchases );

    return (
        <div>

            <PageHeader
                purchases={ purchases }
                currency={ currency }
                datesRange={ dates }
                totalInsumos={ totalInsumos }
                totalAmount={ totalAmount }
                expensive={ expensive }
                expense={ expense }
            />

            <ToogleButtons showChartAction={ setShowChart } showChart={ showChart } />

            {showChart
                ? <ParetoChart insumos={ allInsumosOrdered }/>
                : <ParetoList
                    purchases={ purchases }
                    total={ totalAmount }
                />
            }

        </div>
    )
}

const PageHeader = ({ currency, datesRange, expense, expensive, totalAmount, totalInsumos, purchases }) => {
    return (
        <div
            className="
                my-4 px-2 mx-auto
                grid grid-cols-2 gap-3
                text-center
                max-w-md
            "
        >
            <CardDescriptor
                medium={ purchases.length !== 1 }
                label="Rango de fecha:"
                data={ datesRange }
                userClass="col-span-2"
            />
            <CardDescriptor
                label="Compras"
                data={ purchases.length }
            />
            <CardDescriptor
                label="Insumos" data={ totalInsumos }
                userClass="animate__delay-1s"
            />
            <CardDescriptor
                label={ `Total ${currency}` }
                userClass="animate__delay-2s col-span-2"
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
    )
}

const ToogleButtons = ({ showChartAction, showChart }) => {

    const listClassBtn = showChart ? 'text-warmGray-700 bg-warmGray-100' : 'text-lime-500 bg-lime-50';
    const chartClassBtn = showChart ? 'text-lime-500 bg-lime-50' : 'text-warmGray-700 bg-warmGray-100';

    return (
        <div
            className="
                grid grid-cols-2 items-center justify-center
            "
        >
            <ListButton
                isButton
                onClick={ () => showChartAction( false ) }
                className={ listClassBtn }
            />

            <ChartButton
                isButton
                onClick={ () => showChartAction( true ) }
                className={ chartClassBtn }
            />

        </div>
    )
}

const ParetoChart = ({ insumos }) => {

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

        if ( !isEmpty( insumos ) ) {

            const container = document.querySelector('#d3-pareto__insumos');

            ParetoBarChart.init( container, {
                data: insumos,
                prop: 'total',
                margin: { top: 20, right: 15, bottom: 10, left: 25 },
                width
            });
        }

    }, [width, insumos])

    return (
        <div
            id="d3-pareto__insumos"
            className="
                animate__animated animate__fadeInRightBig
                pb-5
            "
        ></div>
    )
}

const ParetoList = ({ purchases, total }) => {
    return (
        <InsumosBuyedList
            purchases={ purchases }
            total={ total }
        />
    )
}

const CardDescriptor = ({ label, data, userClass = "", medium = false }) => {

    return (
        <div
            className={`
                animate__animated animate__bounceInLeft
                border border-solid border-warmGray-200 rounded-lg
                pl-2 pr-4 py-1
                flex items-end justify-between
                h-12
                ${ userClass }
            `}
        >
            <label
                className="
                    text-warmGray-400 font-bold text-sm text-left
                "
            >{ label }</label>
            <span
                className={`
                    text-lime-500 font-bold ${ medium ? 'text-xl' : 'text-4xl'} text-right
                    transform translate-y-1
                `}
            >{ data }</span>
        </div>
    )
}

const CardExpensive = ({ label, name, amount, userClass }) => {

    return (
        <div
            className={`
                animate__animated animate__bounceInLeft
                border border-solid border-warmGray-200 rounded-lg
                pl-2 pr-4 py-2
                flex items-center justify-between
                relative
                ${ userClass }
            `}
        >
            
            <div className="flex flex-col">
                <label
                    className="
                        text-rose-500 font-bold text-lg text-left
                    "
                >{ label }</label>
                <span
                    className="
                    text-warmGray-500 font-bold text-xl text-left
                    "
                >{ name }</span>
                
            </div>
            
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
