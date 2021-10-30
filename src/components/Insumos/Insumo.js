import { setNewProperty } from 'functionallibrary';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { selectInsumoToBuy } from '../../actions/insumosAction';

import { BasketButton } from '../Buttons/AppButtons';
import { InsumoEtiquetas } from './InsumoEtiquetas';
import { InsumoTitle } from './InsumoTitle';
import { InsumoPrice } from './InsumoPrice';
import { InsumoTotal } from './InsumoTotal';
import { InsumoQuantity } from './InsumoQuantity';
import { InsumoBaseActions, InsumoActions } from './InsumoActions';

export const Insumo = React.memo( ({ insumo, establishment }) => {

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

            <div className="flex p-2 overflow-hidden relative">

                <div className="flex flex-auto">
                    <InsumoTitle title={ title } />
                </div>

                <InsumoActions id={ id } />

            </div>

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
                    <InsumoEtiquetas labels={ labels } />
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

            <div className="flex items-center p-2 pr-10 overflow-hidden relative">

                <div className="flex flex-auto items-center">
                    
                    <InsumoTitle
                        title={ title }
                        checked={ selected }
                    />

                </div>

                <BasketButton
                    isButton
                    className={`
                        rounded-full
                        w-10 h-10
                        mr-2
                        text-base ${ selected ? 'text-lime-500' : 'text-warmGray-800' }
                        ${ selected? 'bg-lime-50' : 'bg-warmGray-100' }
                    `}
                    onClick={ handleSelecting }
                />

                <InsumoBaseActions id={ id } />

            </div>

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
