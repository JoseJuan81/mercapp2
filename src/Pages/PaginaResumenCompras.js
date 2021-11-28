import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPurchase, startGettingPurchases } from '../actions/purchasesAction';
import { ListButton, GalleryButton } from '../components/Buttons/AppButtons';

import { BigAddButton } from '../components/Buttons/BigAddButton';
import { ItemList } from '../components/purchases/ItemList';
import { PurchaseCard } from '../components/purchases/PurchaseCard';

import { nuevaCompraPath } from '../constant/routes';
import { type } from '../constant/type';

import { orderingPurchases } from '../helper/orderingPurchases';

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

const PurchasesCardList = ({ purchases, onSelect }) => {
    return (
        <div
            className="
                animate__animated animate__bounceInRight
                grid grid-cols-2 gap-2
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
                ))
            }
            
        </div>
    )
}

const PurchasesTable = ({ purchases, onSelect }) => {
    return (
        <ul
            className="
                animate__animated animate__bounceInRight
            "
        >
            {purchases.map(( purchase, index ) => (
                <ItemList
                    key={`${ purchase.id }-${ index }`}
                    purchase={ purchase }
                    index={ index }
                    onSelect={ onSelect }
                />
            ))}
        </ul>
    )
}

const PurchasesList = ({ purchases }) => {

    // ===== STAtE =====
    const [view, setView] = useState( type.views.purchases.card);

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== FUNCIONES PROPIAS =====
    const handleOnSelectPurchase = ( purchase ) => {
        
        const selected = !purchase.selected;
        dispatch( selectPurchase({ ...purchase, selected }) );
    }

    return (
        <div>
            <div
                className="
                    flex items-center justify-end
                    mb-4 pr-4
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

            {view === type.views.purchases.card && <PurchasesCardList purchases={ purchases } onSelect={ handleOnSelectPurchase } />}
            {view === type.views.purchases.table && <PurchasesTable purchases={ purchases } onSelect={ handleOnSelectPurchase } />}

        </div>
    )
}


export const PaginaResumenCompras = () => {

    // ===== STORE =====
    const dispatch = useDispatch();

    const { list } = useSelector( state => state.purchases );

    // ===== FUNCIONES PROPIAS =====
    const purchases = orderingPurchases( list );

    // Obtener las compras
    useEffect( () => {

        dispatch( startGettingPurchases() );

    },[])

    return (
        <>
        {purchases && purchases.length > 0
            ? <PurchasesList purchases={ purchases }/>
            : <NoPurchases />
        }
        </>
    )
}
