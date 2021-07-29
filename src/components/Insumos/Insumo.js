import React, { useContext, useEffect, useState } from 'react';
import { round, setNewProperty } from 'functionallibrary';
import { InsumoContext } from '../../context/Insumo/InsumoContext';
import { useIdbInsumos } from '../../hooks/useIdbInsumos';

const twoDecimals = round(2);

const InsumoEtiquetas = React.memo( ({ labels, checked }) => {
    // console.log('10 ETIQUETAS');
    return (
        <ul className="flex flex-wrap">

            {
                labels.map((la, i) => (
                    <li
                        key={`${la}-${i}-${Math.random}`}
                        className={`
                            bg-white
                            text-xs ${ checked ? 'text-lime-700' : 'text-warmGray-800' }
                            m-1 p-1
                        `}
                    >{ la }</li>
                ))
            }

        </ul>
    )
})

const InsumoTitle = React.memo( ({ title, checked }) => {
    // console.log('8 TITULO', title);
    return (
        <dt
            className={`
                duration-200
                flex-auto
                text-2xl font-bold ${checked ? 'text-lime-600' : 'text-warmGray-400'}
                pr-6
            `}
        >
            { title }
        </dt>
    )
})

const InsumoPrice = React.memo( ({ currency, price }) => {
    // console.log('13 PRECIO', price);
    return (
        <dt
            className="
                text-lg text-warmGray-400
                font-semibold
            "
        >
            <small
                className="text-xs font-light"
            >
                { currency }
            </small>
            <span>{ price }</span>
        </dt>
    )
})

const InsumoTotal = React.memo( ({ currency, total }) => {
    // console.log('14 TOTAL', total);
    return (
        <dt
            className="
                text-2xl text-lime-500
                font-bold
            "
        >
            <small className="text-xs font-normal mr-1">total:</small>
            <small className="text-base font-light">{ currency }</small>
            <span>{ total }</span>
        </dt>
    )
})

const InsumoQuantity = React.memo( ({ setTotal, price, id }) => {
    // console.log('11 CANTIDAD', id);

    const { updateQuantityInSelectedInsumo } = useContext( InsumoContext );

    const[q, setQ] = useState(1);

    const handleMinusQuantity = (ev) => {
        ev.stopPropagation();

        const result = q - 1;
        const quantity = result <= 0 ? 1 : result;

        setQ(quantity);
        updateQuantityInSelectedInsumo(id, quantity);
        
    }
    
    const handleAddQuantity = (ev) => {
        ev.stopPropagation();

        const quantity = q + 1;

        setQ(quantity);
        updateQuantityInSelectedInsumo(id, quantity);
    }

    useEffect( () => {

        const total = twoDecimals( q * price );
        setTotal( total );

    }, [q, price])

    return (
        <div className="flex mx-2">
            <button
                data-jest="minusQuantity"
                className="
                    icon-minus
                    bg-gray-100
                    text-gray-500
                    w-12 h-12
                "
                onClick={ handleMinusQuantity }
            ></button>
            <input
                className="
                    mx-1
                    w-10 h-12
                    text-center text-xl font-medium text-warmGray-500
                "
                type="number"
                value={ q }
                onChange={ () => {} }
            />
            <button
                data-jest="addQuantity"
                className="
                    icon-plus
                    bg-lime-50
                    text-lime-500
                    w-12 h-12
                "
                onClick={ handleAddQuantity }
            ></button>
        </div>
    )
})

const InsumoActions = React.memo( ({ id }) => {
    // console.log('9 ACTIONS', id);

    const { deletingInsumoFromContext, updatingInsumo } = useContext( InsumoContext );
    const { deleteInsumoInLocalDB } = useIdbInsumos();

    const [toogle, setToogle] = useState(false);

    const handleClick = ev => {
        ev.stopPropagation();

        setToogle( s => !s );
    }

    const handleDeleteInsumo = async (ev) => {
        ev.stopPropagation();
        
        try {

            deletingInsumoFromContext( id );
            await deleteInsumoInLocalDB( id );
        } catch (err) {
            console.log('Error al eliminar un insumo', err);
        }
    }
    
    const handleUpdateInsumo = (ev) => {
        ev.stopPropagation();

        updatingInsumo( id );

    }

    return (
        <div
            className={`
                absolute right-0
                pr-2
                bg-warmGray-100
                flex
                transform ${ toogle ? 'translate-x-0' : 'translate-x-24' }
                border border-solid ${ toogle ? 'border-warmGray-200' : 'border-white' }
                rounded-l-full
                duration-300
            `}
        >
            <button
                type="button"
                className={`
                    bg-white
                    icon-circle-left
                    flex items-center justify-center
                    text-warmGray-500
                    text-2xl
                    transform ${toogle ? 'rotate-180' : 'rotate-0'}
                    w-10
                    ${ toogle && 'rounded-full' }
                    border border-solid ${ toogle ? 'border-warmGray-200' : 'border-white' }
                    duration-300
                `}
                onClick= { handleClick }
            ></button>

            <div
                className="
                    grid grid-cols-2 gap-2
                "
            >
                <button
                    type="button"
                    className="
                        icon-pencil
                        px-2
                        text-2xl text-blue-500
                    "
                    onClick={ handleUpdateInsumo }
                ></button>
                <button
                    type="button"
                    className="
                        icon-bin2
                        px-2
                        text-2xl text-rose-500
                    "
                    onClick={ handleDeleteInsumo }
                ></button>
            </div>

        </div>
    )
})

export const Insumo = React.memo( ({ insumo }) => {
    // console.log('7 INSUMO', insumo.title);

    const { checked, currency, labels, id, title, price } = insumo;

    const { toogleCheck } = useContext( InsumoContext );

    const [total, setTotal] = useState(insumo.price);


    const handleClickOnInsumo = (ins) => {

        toogleCheck(
            setNewProperty('checked', !ins.checked, ins)
        );
    }

    return (
        <div
            className={`
                duration-200
                rounded-lg ${checked && 'shadow-xl'}
                border border-solid ${checked ? 'border-lime-400' : 'border-warmGray-300'}
            `}
            onClick={ () => handleClickOnInsumo(insumo) }
        >

            <dl className="flex p-2 overflow-hidden relative">

                <div className="flex flex-auto">
                    
                    <InsumoTitle
                        title={ title }
                        checked={ checked }
                    />

                </div>

                <InsumoActions
                    id={ id }
                />

            </dl>

            {labels && labels.length > 0 &&
                <div
                    className={`
                        rounded-br-lg rounded-bl-lg
                        ${ checked ? 'bg-lime-100' : 'bg-warmGray-100' }
                        p-1
                    `}
                >
                    <InsumoEtiquetas
                        labels={ labels }
                        checked={ checked }
                    />
                </div>
            }

            {checked &&
                <div className="flex justify-between items-center py-2 pr-4">

                    <InsumoQuantity
                        setTotal={ setTotal }
                        price={ price }
                        id={ id }
                    />
    
                    <InsumoPrice
                        currency={ currency }
                        price={ price }
                        checked={ checked }
                    />

                    <InsumoTotal
                        currency={ currency }
                        total={ total }
                    />

                </div>
            }
            
        </div>
    )
})
