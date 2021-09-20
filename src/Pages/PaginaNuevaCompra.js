import { getPropertysValue, isEmpty, round } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSelectedInsumos, setEstablishmentInBuy } from '../actions/buyAction';
import { BigAddButton } from '../components/Buttons/BigAddButton';
import { Insumo } from '../components/Insumos/Insumo';
import { misInsumosPath } from '../constant/routes';

import CreatableSelect from 'react-select/creatable';
const establishmentOptions = [
    { value: 'wong', label: 'Wong' },
    { value: 'mass', label: 'Mass' },
    { value: 'bodega frente', label: 'Bodega frente' },
    { value: 'metro', label: 'Metro' },
]

const twoDecimals = round(2);

export const PaginaNuevaCompra = () => {

    const dispatch = useDispatch();

    const { selectedInsumos, establishmentName } = useSelector( state => state.buy );

    const [total, setTotal] = useState(0);

    const handleChange = ( inputValue, actionMeta ) => {

        const value = getPropertysValue( 'value', inputValue ) || '';

        dispatch( setEstablishmentInBuy( value ) );
    }

    useEffect( () => {

        dispatch( loadSelectedInsumos() );

    }, [])

    useEffect( () => {

        const total = selectedInsumos.reduce((acc, item) => {

            const price = item.price[establishmentName];
            const quantity = item.quantity || 1;

            const priceTotal = ( price * quantity ) || 0;
            return twoDecimals( acc +  priceTotal );

        }, 0);

        setTotal( total );

    }, [selectedInsumos, establishmentName])

    return (
        <div
            className="
                grid gap-3
                self-start
                w-full
                px-2 pb-2
            "
        >
            <form>
                <fieldset className="flex items-center justify-between">
                    <CreatableSelect
                        isClearable
                        autoFocus
                        className="flex-1"
                        createOptionPosition="first"
                        onChange={handleChange}
                        options={establishmentOptions}
                    />
                    <h1
                        className="
                            text-2xl font-bold
                            mr-3 ml-6
                        "
                    >
                        <span
                            className="
                                text-xs font-light
                                mx-1
                            "
                        >PEN</span>
                        { total }
                    </h1>
                </fieldset>
            </form>
            {isEmpty( selectedInsumos ) &&

                <BigAddButton
                    to={ misInsumosPath }
                    title="Agregrar insumos"
                />
            }

            {selectedInsumos.map(( insumo, ind ) => (
                <Insumo
                    key={ `${ insumo.id } - ${ ind }` }
                    insumo={ insumo }
                    establishment={ establishmentName }
                />
            ))}

        </div>
    )
}
