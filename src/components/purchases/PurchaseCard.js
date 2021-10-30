import React from 'react';

import { getDayInWord, getFormatDate } from '../../helper/dates';

const LockedBuyIcon = React.memo(({ closed }) => {
    return (
        <div
            className={`
                ${ closed ? 'text-warmGray-200' : 'text-lime-200' } text-4xl
            `}
        >
            {closed
                ? <i className="fas fa-lock"></i>
                : <i className="fas fa-lock-open"></i>
            }
        </div>
    )
})

const BuyTotal = React.memo(({ total }) => {
    return (
        <h1
            className="
                text-warmGray-800 text-2xl text-right
            "
        >S/.{ total }</h1>
    )
})

const BuyEstablishmentName = React.memo(({ closed, name }) => {
    return (
        <h3
            className={`
                ${ closed ? 'bg-warmGray-200' : 'bg-lime-100' }
                px-2
                text-warmGray-500 text-sm font-bold
            `}
        >{ name }</h3>
    )
})

const BuyedInsumos = React.memo(({ insumos }) => {
    const len = insumos.length;

    return (
        <div
            className="
                flex flex-col
            "
        >
            <span
                className="
                    text-xl font-light
                "
            >
                { len }
            </span>
            <span
                className="
                    text-xs
                "
            >insumos</span>
        </div>
    )
})

const BuyDate = React.memo(({ date }) => {
    return (
        <div
            className="
                flex flex-col items-end justify-center
            "
        >
            <span
                className=""
            >{ getDayInWord( date )}
            </span> 
            <span
                className=""
            >{ getFormatDate( date ) }
            </span>
        </div>
    )
})

export const PurchaseCard = ({ purchase }) => {

    const { closed, createdAt, establishmentName, insumos, total } = purchase;

    return (
        <div
            className={`
                border-solid ${ closed ? 'border border-warmGray-200' : 'border-2 border-lime-200' }
                rounded-xl
                shadow-lg
                flex-initial
            `}
        >
            <div
                className="
                    p-4
                    flex items-end justify-between
                "
            >
                <LockedBuyIcon closed={ closed } />
                <BuyTotal total={ total } />
            </div>

            <BuyEstablishmentName name={ establishmentName } closed={ closed } />

            <div
                className="
                    grid gap-1 grid-cols-2 items-end
                    px-2 py-2
                    text-warmGray-500 text-sm
                "
            >
                <BuyedInsumos insumos={ insumos } />
                <BuyDate date={ createdAt } />
            </div>
        </div>
    )
}
