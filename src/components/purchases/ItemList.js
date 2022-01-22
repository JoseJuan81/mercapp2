import React from 'react';

import { BuyDate } from './BuyDate'
import { BuyedInsumos } from './BuyedInsumos'
import { BuyEstablishmentName } from './BuyEstablishmentName'
import { BuyTotal } from './BuyTotal'
import { CheckedCard } from './CheckedCard';
import { LockedBuyIcon } from './LockedBuyIcon'

export const ItemList = ({ purchase, index, onSelect }) => {

    const first = index === 0;
    const even = index % 2 === 0;

    let borderLocationAndColor = first ? 'border-b border-t border-warmGray-200' : 'border-b border-warmGray-200';
    borderLocationAndColor = purchase.selected ? 'border-2 border-lime-400' : borderLocationAndColor;
    let selectedBg = even ? 'bg-white' : 'bg-warmGray-50'
    selectedBg = purchase.selected ? 'bg-lime-50 bg-opacity-30' : selectedBg;

    return (
        <li
            className={`
                flex
                w-full
                py-1 pr-2
                ${ borderLocationAndColor } border-solid
                ${ selectedBg }
            `}
            onClick={ () => onSelect( purchase ) }
        >
            <div
                className="
                    ml-2
                    flex items-center justify-center
                    relative
                "
            >
                <CheckedCard inline selected={ purchase.selected } />
                <LockedBuyIcon closed={ purchase.closed } selected={ purchase.selected } />
            </div>

            <div
                className="
                    w-full
                    ml-2 px-2
                "
            >
                <div
                    className="
                        flex items-center justify-between
                    "
                >
                    <BuyEstablishmentName
                        name={ purchase.establishmentName }
                        selected={ purchase.selected }
                    />
                    <BuyTotal total={ purchase.total } selected={ purchase.selected } />
                </div>
                <div
                    className="
                        flex items-center justify-between
                    "
                >
                    <BuyedInsumos inline insumos={ purchase.insumos } selected={ purchase.selected } />
                    <BuyDate inline date={ purchase.date || purchase.createdAt } selected={ purchase.selected } />
                </div>
            </div>
        </li>
    )
}
