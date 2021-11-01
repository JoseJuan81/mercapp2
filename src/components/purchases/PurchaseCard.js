import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectPurchase, unSelectPurchase } from '../../actions/purchasesAction';

import { getDayInWord, getFormatDate } from '../../helper/dates';

import { CheckBox, CheckBoxSelected } from '../Buttons/AppButtons';


// ===== COMPONENTES =====
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

const BuyEstablishmentName = React.memo(({ selected, name }) => {
    return (
        <h3
            className={`
                ${ selected ? 'bg-lime-100' : 'bg-warmGray-200' }
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

const CheckedCard = React.memo(({ selected }) => {
    return (
        <div
            className="
                absolute -top-1 left-0
                w-full
                flex justify-end items-start
                px-1 pt-1
            "
        >
            {selected
                ? (<CheckBoxSelected
                    isButton
                    className="
                        text-lime-400 text-base
                    "
                />)
                : (<CheckBox
                    isButton
                    className="
                        text-warmGray-300 text-base
                    "
                />)
            }

        </div>
    )
})

export const PurchaseCard = ({ purchase }) => {

    const { closed, createdAt, establishmentName, insumos, total } = purchase;

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== STATE =====
    const [selected, setSelected] = useState(false);

    // ===== FUNCIONES PROPIAS =====
    const handleOnClick = () => {
        setSelected( s => !s );
    }

    // ===== ACTUALIZAR EL STORE CADA VEZ QUE CAMBIE SELECTED =====
    useEffect(() => {
        
        if ( selected ) {

            dispatch( selectPurchase({ ...purchase, selected }) );
        } else {
            
            dispatch( unSelectPurchase({ ...purchase, selected }) );
        }

    }, [selected, dispatch])

    return (
        <div
            className={`
                border-solid ${ selected ? 'border-2 border-lime-200' : 'border border-warmGray-200' }
                rounded-xl
                ${ selected && 'shadow-lg' }
                flex-initial
                transition-200
                relative
            `}
            onClick={ handleOnClick }
        >
            <CheckedCard selected={ selected } />
            
            <div
                className="
                    p-4
                    flex items-end justify-between
                "
            >
                <LockedBuyIcon closed={ closed } />
                <BuyTotal total={ total } />
            </div>

            <BuyEstablishmentName name={ establishmentName } selected={ selected } />

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
