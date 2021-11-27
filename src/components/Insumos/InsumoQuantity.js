import { round } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { startUpdatingQuantity } from '../../actions/newPurchaseAction';

const twoDecimals = round(2);

export const InsumoQuantity = React.memo( ({ setTotal, price, id, quantity: insumoQuantity }) => {


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
        setTotal( total );

    }, [q, price, setTotal])

    useEffect( () => {

        dispatch( startUpdatingQuantity({ id, quantity: q }) );

    }, [q, dispatch, id])

    return (
        <div className="flex mx-2">
            <button
                data-jest="minusQuantity"
                className="
                    bg-gray-50
                    text-gray-500 text-2xl
                    w-10 h-10
                "
                onClick={ handleMinusQuantity }
            >
                <i className="fas fa-minus"></i>
            </button>
            <input
                className="
                    w-12 h-10
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
                    w-10 h-10
                "
                onClick={ handleAddQuantity }
            >
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
})
