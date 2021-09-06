import React, { useEffect, useState } from 'react';
import { round, setNewProperty } from 'functionallibrary';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { useIdbInsumos } from '../../hooks/useIdbInsumos';
import { startDeletingInsumos } from '../../actions/insumosAction';
import { setInsumoToUpdate } from '../../actions/newInsumoAction';
import { editarInsumoPath, nuevoInsumoPath } from '../../constant/routes';

const twoDecimals = round(2);

const InsumoEtiquetas = React.memo( ({ labels, checked }) => {

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

    return (
        <dt
            className={`
                duration-200
                flex-auto
                text-2xl font-medium ${checked ? 'text-lime-600' : 'text-warmGray-800'}
                pr-6
            `}
        >
            { title }
        </dt>
    )
})

const InsumoPrice = React.memo( ({ currency, price }) => {

    return (
        <dt
            className="
                text-2xl text-warmGray-500
                font-light
            "
        >
            <small
                className="text-xs"
            >
                { currency }
            </small>
            <span>{ price }</span>
        </dt>
    )
})

const InsumoTotal = React.memo( ({ currency, total }) => {

    return (
        <dt
            className="
                text-3xl text-lime-500
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


    const initialQuantity = 1;
    const dispatch = useDispatch();

    const[q, setQ] = useState( initialQuantity );

    const handleMinusQuantity = (ev) => {
        ev.stopPropagation();

        const result = Number( q ) - 1;
        const quantity = result < 0 ? 1 : result;

        setQ(quantity);
        dispatch({ type: 'quantity-change', payload: { id, quantity } });
        
    }
    
    const handleAddQuantity = (ev) => {
        ev.stopPropagation();

        const quantity = Number( q )  + 1;

        setQ(quantity);
        dispatch({ type: 'quantity-change', payload: { id, quantity } })
    }
    
    const handleInputChange = (e) => {
        
        const quantity = e.target.value;
        setQ( quantity );
        dispatch({ type: 'quantity-change', payload: { id, quantity } })
    }

    useEffect( () => {

        const total = twoDecimals( q * price );
        setTotal( total );

    }, [q, price])

    useEffect( () => {

        dispatch({ type: 'quantity-change', payload: { id, quantity: initialQuantity } });

    }, [])

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
                    w-16 h-12
                    text-center text-xl font-medium text-warmGray-500
                "
                type="number"
                step={ 1 }
                min={ 0 }
                value={ q }
                onChange={ handleInputChange }
                onClick={ e => e.stopPropagation() }
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
    
    const dispatch = useDispatch();
    const history = useHistory();

    const [toogle, setToogle] = useState(false);

    const handleClick = ev => {
        ev.stopPropagation();

        setToogle( s => !s );
    }

    const handleDeleteInsumo = (ev) => {
        ev.stopPropagation();

        dispatch( startDeletingInsumos( id ) );
    }
    
    const handleUpdateInsumo = (ev) => {
        ev.stopPropagation();

        dispatch( setInsumoToUpdate( id ) );

        history.push( `${ editarInsumoPath }/${ id }` );
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
                    ${ toogle ? 'rounded-full' : 'rounded-l-full' }
                    border border-solid border-warmGray-200
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
                        text-xl text-warmGray-800
                    "
                    onClick={ handleUpdateInsumo }
                ></button>
                <button
                    type="button"
                    className="
                        icon-bin2
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleDeleteInsumo }
                ></button>
            </div>

        </div>
    )
})

export const Insumo = React.memo( ({ insumo }) => {
    // console.log('7 INSUMO', insumo.title);

    const { checked, currency, labels, id, name: title, price } = insumo;

    const dispatch = useDispatch();

    const [total, setTotal] = useState(insumo.price);


    const handleClickOnInsumo = (ins) => {

        dispatch({
            type: 'toogle',
            payload: setNewProperty('checked', !ins.checked, ins)
        });
    }

    return (
        <div
            className={`
                w-full
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

            {
                price && currency &&
                <div className="ml-2">
                    <InsumoPrice
                        currency={ currency }
                        price={ price }
                        checked={ checked }
                    />
                </div>
            }

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

                    <InsumoTotal
                        currency={ currency }
                        total={ total }
                    />

                </div>
            }
            
        </div>
    )
})
