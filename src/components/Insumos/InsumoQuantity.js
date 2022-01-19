import { round } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { startUpdatingQuantity, startUpdatingTotal } from '../../actions/newPurchaseAction';
import { InputField } from '../Form/InputField';

const twoDecimals = round(2);

export const InsumoQuantity = React.memo( ({ price, id, quantity: insumoQuantity }) => {


    const initialQuantity = insumoQuantity || 1;
    const dispatch = useDispatch();

    const[q, setQ] = useState( initialQuantity );

    const handleMinusQuantity = (ev) => {
        ev.stopPropagation();

        const result = Number( q ) - 1;
        const quantity = result < 0 ? 1 : result;

        setQ(quantity);
        
    }
    
    const handleAddQuantity = (ev) => {
        ev.stopPropagation();

        const quantity = Number( q )  + 1;

        setQ(quantity);
    }
    
    const handleInputChange = (e) => {
        
        const quantity = e.target.value;
        setQ( quantity );
    }

    // Actualizar total cada vez que cambie la cantidad y el precio
    useEffect( () => {

        const total = twoDecimals( q * price ) || 0;
        dispatch( startUpdatingTotal({ id, total }) );

    }, [q, price, dispatch, id])

    useEffect( () => {

        dispatch( startUpdatingQuantity({ id, quantity: q }) );

    }, [q, dispatch, id])

    return (
        <div className="flex mx-2 h-full">
            <button
                data-jest="minusQuantity"
                className="
                    bg-warmGray-50
                    text-warmGray-500 text-2xl
                    w-10 h-full
                "
                onClick={ handleMinusQuantity }
            >
                <i className="fas fa-minus"></i>
            </button>
            <InputField
                specialClass="
                    w-16 h-full
                    text-center text-lg font-medium text-warmGray-600
                    input-transparent
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
                    w-10 h-full
                "
                onClick={ handleAddQuantity }
            >
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
})
