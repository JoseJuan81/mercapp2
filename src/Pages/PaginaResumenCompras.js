import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startGettingPurchases } from '../actions/purchasesAction';

import { BigAddButton } from '../components/Buttons/BigAddButton';
import { PurchaseCard } from '../components/purchases/PurchaseCard';

import { nuevaCompraPath } from '../constant/routes';

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

const PurchasesList = ({ purchases }) => {
    return (
        <div
            style={{
                gridTemplateRows: 'repeat(auto-fit, minmax(0, 10rem))'
            }}
            className="
                grid grid-cols-2 gap-2
                h-full w-full
                px-2
                overflow-scroll
            "
        >
            {purchases.map( ( purchase, index ) => (
                    <PurchaseCard
                        purchase={ purchase }
                        key={ `${ purchase.id }-${ index }` }
                    />
                ))
            }
            
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
