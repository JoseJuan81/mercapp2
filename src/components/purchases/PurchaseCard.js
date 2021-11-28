import React from 'react';

import { BuyDate } from './BuyDate';
import { BuyedInsumos } from './BuyedInsumos';
import { BuyEstablishmentName } from './BuyEstablishmentName';
import { BuyTotal } from './BuyTotal';
import { CheckedCard } from './CheckedCard';
import { LockedBuyIcon } from './LockedBuyIcon';

export const PurchaseCard = ({ purchase, onSelect }) => {

    return (
        <div
            className={`
                border-solid ${ purchase.selected ? 'border-2 border-lime-200' : 'border border-warmGray-200' }
                rounded-xl
                ${ purchase.selected && 'shadow-lg' }
                flex-initial
                transition-200
                relative
            `}
            onClick={ () => onSelect( purchase ) }
        >
            <CheckedCard selected={ purchase.selected } />
            
            <div
                className="
                    p-4
                    flex items-end justify-between
                "
            >
                <LockedBuyIcon closed={ purchase.closed } selected={ purchase.selected } />
                <BuyTotal total={ purchase.total } selected={ purchase.selected } />
            </div>

            <BuyEstablishmentName name={ purchase.establishmentName } selected={ purchase.selected } />

            <div
                className="
                    grid gap-1 grid-cols-2 items-end
                    px-2 py-2
                "
            >
                <BuyedInsumos insumos={ purchase.insumos } selected={ purchase.selected } />
                <BuyDate date={ purchase.date || purchase.createdAt } selected={ purchase.selected } />
            </div>
        </div>
    )
}
