import { round, setNewProperty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startUpdatingQuantity } from '../../actions/buyAction';

// import { useIdbInsumos } from '../../hooks/useIdbInsumos';
import { startDeletingInsumos, selectInsumoToBuy } from '../../actions/insumosAction';
import { setInsumoToUpdate } from '../../actions/newInsumoAction';
import { editarInsumoPath } from '../../constant/routes';
import { InputField } from '../Form/InputField';

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
                text-2xl font-medium ${checked ? 'text-lime-500' : 'text-warmGray-800'}
                pr-6
            `}
        >
            { title }
        </dt>
    )
})

const InsumoPrice = React.memo( ({ currency = 'PEN', price }) => {

    return (
        <dt
            className="
                text-2xl text-warmGray-500
                font-light
                mx-2
                relative
            "
        >
            <div
                className="
                    text-xs
                    absolute top-0 left-0
                    flex items-end justify-center
                    w-10 h-full
                    pb-3
                "
            >
                <span>{ currency }</span>
            </div>
            <InputField
                specialClass="input-transparent pl-10"
                value={ price }
            />
        </dt>
    )
})

const InsumoTotal = React.memo( ({ currency = 'PEN', total }) => {

    return (
        <dt
            className="
                text-2xl text-warmGray-500
                font-medium
                flex items-baseline
            "
        >
            <small className="text-xs font-light">total:</small>
            <small className="text-xs font-light mx-2">{ currency }</small>
            <span>{ total }</span>
        </dt>
    )
})

const InsumoQuantity = React.memo( ({ setTotal, price, id, quantity: insumoQuantity }) => {


    const initialQuantity = insumoQuantity || 1;
    const dispatch = useDispatch();

    const[q, setQ] = useState( initialQuantity );

    const handleMinusQuantity = (ev) => {
        ev.stopPropagation();

        const result = Number( q ) - 1;
        const quantity = result < 0 ? 1 : result;

        setQ(quantity);
        dispatch( startUpdatingQuantity({ id, quantity }) );
        
    }
    
    const handleAddQuantity = (ev) => {
        ev.stopPropagation();

        const quantity = Number( q )  + 1;

        setQ(quantity);
        dispatch( startUpdatingQuantity({ id, quantity }) );
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
                    bg-gray-100
                    text-gray-500 text-2xl
                    w-12 h-12
                "
                onClick={ handleMinusQuantity }
            >
                <i className="fas fa-minus"></i>
            </button>
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
                    bg-lime-50
                    text-lime-500 text-2xl
                    w-12 h-12
                "
                onClick={ handleAddQuantity }
            >
                <i className="fas fa-plus"></i>
            </button>
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
                absolute right-1
                h-10
                bg-warmGray-100
                flex
                transform ${ toogle ? 'translate-x-1' : 'translate-x-28' }
                border border-solid ${ toogle ? 'border-warmGray-200' : 'border-white' }
                rounded-l-full
                duration-300
            `}
        >
            <button
                type="button"
                className={`
                    bg-white
                    flex items-center justify-center
                    text-warmGray-600 text-xl
                    transform ${toogle ? 'rotate-180' : 'rotate-0'}
                    w-10
                    ${ toogle ? 'rounded-full' : 'rounded-l-full' }
                    border border-solid border-warmGray-200
                    duration-300
                `}
                onClick= { handleClick }
            >
                <i className="fas fa-chevron-circle-left"></i>
            </button>

            <div
                className="
                    grid grid-cols-2 gap-2
                    px-2
                "
            >
                <button
                    type="button"
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleUpdateInsumo }
                >
                    <i className="far fa-edit"></i>
                </button>
                <button
                    type="button"
                    className="
                        px-2
                        text-xl text-warmGray-800
                    "
                    onClick={ handleDeleteInsumo }
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>

        </div>
    )
})

export const Insumo = React.memo( ({ insumo, establishment }) => {
    // console.log('7 INSUMO', insumo.title);

    const { currency, labels, id, name: title, price: priceObject, quantity } = insumo;
    const price = priceObject[establishment.toLowerCase()] || 0;

    const dispatch = useDispatch();

    const [total, setTotal] = useState( price );


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
                rounded-lg
                border border-solid border-warmGray-300
            `}
            onClick={ () => handleClickOnInsumo(insumo) }
        >

            <dl className="flex p-2 overflow-hidden relative">

                <div className="flex flex-auto">
                    
                    <InsumoTitle
                        title={ title }
                    />

                </div>

                <InsumoActions
                    id={ id }
                />

            </dl>

            <InsumoPrice
                currency={ currency }
                price={ price }
            />

            {labels && labels.length > 0 &&
                <div
                    className={`
                        bg-warmGray-100
                        p-1
                    `}
                >
                    <InsumoEtiquetas
                        labels={ labels }
                    />
                </div>
            }

            <div className="flex justify-between items-center py-2 pr-4">

                <InsumoQuantity
                    setTotal={ setTotal }
                    price={ price }
                    id={ id }
                    quantity={ quantity }
                />

                <InsumoTotal
                    currency={ currency }
                    total={ total }
                />

            </div>
            
        </div>
    )
})
export const InsumoBase = React.memo( ({ insumo }) => {
    // console.log('7 INSUMO', insumo.title);
    const dispatch = useDispatch();

    const { selected, labels, id, name: title } = insumo;

    const handleSelecting = () => {

        const selectedInsumo = setNewProperty( 'selected', !selected, insumo );
        dispatch( selectInsumoToBuy( selectedInsumo ) );
    }

    return (
        <div
            className={`
                w-full
                relative
                duration-200
                rounded-lg ${selected && 'shadow-xl'}
                border border-solid ${selected ? 'border-lime-400' : 'border-warmGray-300'}
            `}
            onClick={ () => {} }
        >

            <dl className="flex items-center p-2 pr-10 overflow-hidden relative">

                <div className="flex flex-auto items-center">
                    
                    <InsumoTitle
                        title={ title }
                        checked={ selected }
                    />

                </div>

                <button
                    className={`
                        rounded-full
                        w-10 h-10
                        mr-2
                        text-base ${ selected ? 'text-lime-500' : 'text-warmGray-800' }
                        ${ selected? 'bg-lime-50' : 'bg-warmGray-100' }
                    `}
                    onClick={ handleSelecting }
                >
                    <i className="fas fa-shopping-basket"></i>
                </button>

                <InsumoActions
                    id={ id }
                />

            </dl>

            {labels && labels.length > 0 &&
                <div
                    className={`
                        rounded-br-lg rounded-bl-lg
                        ${ selected ? 'bg-lime-100' : 'bg-warmGray-100' }
                        p-1
                    `}
                >
                    <InsumoEtiquetas
                        labels={ labels }
                        checked={ selected }
                    />
                </div>
            }

        </div>
    )
})
