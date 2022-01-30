import { isEmpty, round } from 'functionallibrary';
import React, { useEffect, useState } from 'react';

import { DownButton } from '../components/Buttons/AppButtons';
import { Descriptor } from '../components/Descriptor';
import { BuyDate } from '../components/purchases/BuyDate';
import { BuyEstablishmentName } from '../components/purchases/BuyEstablishmentName';
import ParetoBarChart from '../helper/paretoInsumosChart';

import { capitalizeText } from '../helper/capitalize';
import { extractAndOrderInsumos } from '../helper/extractAndOrderInsumos';
import { getTotalAmountAndTotalInsumos } from '../helper/getTotalAmountAndTotalInsumos';
import { paretoOrdering } from '../helper/paretoOrdering';

const twoDecimals = round( 2 );

export const PaginaEstadisticasCompras = ({ purchases, currency = 'S/.' }) => {

    // ===== STATE =====
    const [width, setWidth] = useState( window.innerWidth );

    // ===== VARIABLES LOCALES =====
    const { totalInsumos, totalAmount } = getTotalAmountAndTotalInsumos( purchases );
    const purchasesPareto = paretoOrdering( purchases, { prop: 'total', total: totalAmount } );
    const allInsumosOrdered = extractAndOrderInsumos( purchases );


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
                    my-4 px-2
                    grid grid-cols-3
                    text-center
                "
            >
                <Descriptor userClass="flex flex-col" label="Compras" data={ purchases.length } />
                <Descriptor userClass="flex flex-col animate__delay-1s" label={ `Total ${currency}` } data={ totalAmount } />
                <Descriptor userClass="flex flex-col animate__delay-2s" label="Insumos" data={ totalInsumos } />
                
            </div>

            <div id="d3-pareto__insumos" className="pb-5"></div>
            {/* <PurchasesList purchases={ purchasesPareto } currency={ currency } /> */}
        </div>
    )
}

const PurchasesList = ({ purchases, currency }) => (
    <div
        className="
            animate__animated animate__bounceInUp animate__delay-4s
        "
    >
        {purchases.map((purchase, ind) => (
            <Purchase
                key={`${purchase.date}-${ind}`}
                data={ purchase }
                index={ ind + 1}
                currency={ currency }
            />
        ))}
    </div>
)

const Purchase = ({ data, index, currency }) => {

    // ===== STATE =====
    const [expand, setExpand] = useState( false );

    // ===== LOCAL VARIABLES =====
    const name = capitalizeText( data.establishmentName );

    return (
        <div
            className="
                border border-solid border-warmGray-300 rounded
                p-2 mb-3
            "
        >
            <PurchaseHeader
                index={ index }
                date={ data.date }
                purchaseName={ data.name }
                expandAction={ () => setExpand( e => !e ) }
            />

            <BuyEstablishmentName name={ name } selected={ true } />

            <PurchaseGeneralData quantity={ data.insumos.length } currency={ currency } total={ data.total } />

            <InsumosList insumos={ data.insumos } expand={ expand } totalPurchase={ data.total } />

        </div>
    )
}

const PurchaseHeader = ({ index, expandAction, purchaseName, date }) => {
    return (
        <div
            className="
                mb-2
                flex flex-col items-end
            "
        >
            <BuyDate date={ date } inline />

            <div
                className="
                    flex items-center justify-between
                    w-full
                "
            >
                <PurchaseIndex index={ index } />
                <h1>{ purchaseName }</h1>
                <DownButton
                    isButton
                    className="
                        rounded-full
                        min-w-10 w-10 h-10
                        mr-2
                    "
                    onClick={ expandAction }
                />
            </div>
        </div>
    )
}

const PurchaseIndex = ({ index }) => (
    <h1
        className="
            font-bold text-2xl
        "
    >
        #{ index }
    </h1>
)

const PurchaseGeneralData = React.memo(({ currency, total, quantity}) => {

    return (
        <div
            className="
                flex items-center justify-between
                mt-2
            "
        >
            <h2
                className="
                    text-xl font-semibold
                "
            >
                <span
                    className="
                        text-base font-normal text-warmGray-600
                    "
                >Insumos: </span>
                { quantity }
            </h2>
            <h2
                className="
                    text-xl font-semibold
                    bg-warmGray-100
                    px-2
                "
            >
                <span
                    className="
                        text-base font-normal text-warmGray-600
                        mr-2
                    "
                >Total: { currency }</span>
                { total }
            </h2>
            
        </div>
    )
})

const InsumosList = ({ expand, insumos, totalPurchase }) => {

    const insumosOrdered = paretoOrdering( insumos, { prop: 'total', total: totalPurchase } );

    return (
        <ul
            style={{
                maxHeight: `${ expand ? '300rem' : '0' }`
            }}
            className="
                overflow-hidden
                duration-500
                space-y-2 divide-y divide-warmGray-200
                mt-2
            "
        >
            {insumosOrdered.map((insumo, index) => (
                <InsumoItem
                    insumo={ insumo }
                    index={ index + 1 }
                    key={`${insumo.id}${index}`}
                />
            ))}
        </ul>
    )
}

const InsumoItem = ({ insumo, index }) => (
    <li
        className="
            pt-4
        "
    >
        <h2
            className="
                font-semibold text-lg
                py-2
            "
        >{ index + '.-  ' + insumo.name}</h2>
        <div
            className="
                grid grid-cols-3
            "
        >
            <span
                className="
                    bg-warmGray-50
                    h-10
                    flex items-center justify-center
                "
            >cant.: { insumo.quantity }</span>
            <span
                className="
                    bg-warmGray-100
                    flex items-center justify-center
                "
            >precio.: { twoDecimals( insumo.total / insumo.quantity ) }</span>
            <span
                className="
                    bg-warmGray-200
                    flex items-center justify-center
                "
            >total: { insumo.total }</span>
        </div>

    </li>
)

