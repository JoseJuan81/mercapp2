import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPurchase, startGettingPurchases, unSelectPurchase } from '../actions/purchasesAction';
import { ListButton, GalleryButton } from '../components/Buttons/AppButtons';

import { BigAddButton } from '../components/Buttons/BigAddButton';
import { ItemList } from '../components/purchases/ItemList';
import { PurchaseCard } from '../components/purchases/PurchaseCard';
import { BaseButton } from '../components/Buttons/AppButtons';

import { nuevaCompraPath } from '../constant/routes';
import { type } from '../constant/type';

import { capitalizeText } from '../helper/capitalize';
import { getPurchasesByMonth, orderingPurchases } from '../helper/orderingPurchases';

export const PaginaResumenCompras = () => {

    // ===== STORE =====
    const dispatch = useDispatch();

    const { list } = useSelector( state => state.purchases );

    // Obtener las compras
    useEffect( () => {

        dispatch( startGettingPurchases() );

    },[])

    return (
        <>
        {list && list.length > 0
            ? <PurchasesList purchasesList={ list }/>
            : <NoPurchases />
        }
        </>
    )
}

const PurchasesList = ({ purchasesList }) => {

    // ===== STAtE =====
    const [view, setView] = useState( type.views.purchases.table );
    const [period, setPeriod] = useState( type.period.week );

    // ===== VARIABLES PROPIAS =====
    const purchases = getPurchasesByMonth( purchasesList, { period } );

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== FUNCIONES PROPIAS =====
    const handleOnSelectPurchase = ( purchase ) => {
        
        const selected = !purchase.selected;
        const selectedFN = selected ? selectPurchase : unSelectPurchase;
        dispatch( selectedFN({ ...purchase, selected }) );
    }

    return (
        <div>
            <div
                className="
                    flex items-center justify-between
                    mb-4 px-4
                "
            >
                <PeriodButtons period={ period } setPeriod={ setPeriod } />
                <ViewButtons view={ view } setView={ setView } />
            </div>
            <PurchasesWrapperList
                view={ view }
                purchases={ purchases }
                selectedPeriod={ period }
                onSelect={ handleOnSelectPurchase }
            />
        </div>
    )
}

const PeriodButtons = React.memo(({ period, setPeriod }) => {

    // ===== VARIABLES GLOBALES =====
    const selected = "bg-lime-50 text-lime-500";
    const unSelected = "bg-warmGray-50 text-warmGray-800";
    const isWeek = period === type.period.week;
    const isMonth = period === type.period.month;

    return (
        <div
            className="
                flex items-center
                text-sm
            "
        >
            <button
                className={`
                    px-4 py-2
                    h-12
                    ${ isWeek ? selected : unSelected }
                `}
                onClick={ () => setPeriod( type.period.week ) }
            >
                semana
            </button>
            <button className={`
                px-4 py-2
                h-12
                ${ isMonth ? selected : unSelected }
            `}
            onClick={ () => setPeriod( type.period.month ) }
            >
                mes
            </button>
        </div>
    )
})

const ViewButtons = React.memo(({ view, setView }) => {
    return (
        <div
            className="
                flex items-center justify-end
            "
        >
            <ListButton
                isButton
                className={`
                    ${ view === type.views.purchases.table ? 'bg-lime-50' : 'bg-white' }
                    ${ view === type.views.purchases.table ? 'text-lime-500' : 'text-warmGray-600' }
                    px-4 py-2
                    text-3xl
                `}
                onClick={ () => setView( type.views.purchases.table ) }
            />
            <GalleryButton
                isButton
                className={`
                    ${ view === type.views.purchases.card ? 'bg-lime-50' : 'bg-white' }
                    ${ view === type.views.purchases.card ? 'text-lime-500' : 'text-warmGray-600' }
                    px-4 py-2
                    text-3xl
                `}
                onClick={ () => setView( type.views.purchases.card ) }
            />
        </div>
    )
})

const PurchasesWrapperList = ({ view, purchases, onSelect, selectedPeriod }) => {

    // ===== VARIABLES LOCALES =====
    const isGalleryView = type.views.purchases.card === view;
    const isTableView = type.views.purchases.table === view;

    return (
        <div>
            {purchases.map(( period, periodIndex) => (
                <div
                    key={period.name + '-' + periodIndex}
                    className="
                        relative
                       mb-5
                    "
                >
                    <h2
                        className="
                            sticky -top-4 z-10
                            bg-white
                            w-full
                            font-bold text-xl text-warmGray-800
                            px-3 py-2
                            flex justify-between items-center 
                        "
                    >
                        <span
                            className="
                                text-warmGray-500 font-semibold
                            "
                        >{ capitalizeText( period.name ) }</span>
                        <span>{ period.total }</span>
                    </h2>

                    {isGalleryView && <GalleryView purchases={ period.purchases } onSelect={ onSelect } />}
                    {isTableView && <TableView purchases={ period.purchases } onSelect={ onSelect } />}
                    
                </div>
            ))}
            
        </div>
    )
}

const GalleryView = React.memo(({ purchases, onSelect }) => {
    return (
        <div
            className="
                grid grid-cols-2 gap-2
                animate__animated animate__bounceInRight
                h-full w-full
                px-2
                overflow-scroll
            "
        >
            {purchases.map( ( purchase, index ) => (
                <PurchaseCard
                    key={ `${ purchase.id }-${ index }` }
                    purchase={ purchase }
                    onSelect={ onSelect }
                />
            ))}
        </div>
    )
})

const TableView = React.memo(({ purchases, onSelect }) => {
    return (
        <ul
            className="
                block
                animate__animated animate__bounceInRight
                h-full w-full
                px-2
                overflow-scroll
            "
        >
            {purchases.map( ( purchase, index ) => (
                <ItemList
                    key={ `${ purchase.id }-${ index }` }
                    purchase={ purchase }
                    onSelect={ onSelect }
                />
            ))}
        </ul>
    )
})

const NoPurchases = React.memo(() => {
    return (
        <div
            className="
                flex flex-wrap items-center justify-center
                h-full w-full
                overflow-scroll
            "
        >
            <BigAddButton
                to={ nuevaCompraPath }
                title="Nueva compra"
            />
        </div>
    )
})
