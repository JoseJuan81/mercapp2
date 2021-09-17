import { getPropertysValue, isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSelectedInsumos, setEstablishmentInBuy } from '../actions/buyAction';
import { BigAddButton } from '../components/Buttons/BigAddButton';
import { InputField } from '../components/Form/InputField';
import { Insumo } from '../components/Insumos/Insumo';
import { misInsumosPath } from '../constant/routes';

import CreatableSelect from 'react-select/creatable';
const establishmentOptions = [
    { value: 'wong', label: 'Wong' },
    { value: 'mass', label: 'Mass' },
    { value: 'bodega frente', label: 'Bodega frente' },
    { value: 'metro', label: 'Metro' },
]

export const PaginaNuevaCompra = () => {

    const dispatch = useDispatch();

    const { selectedInsumos, establishmentName } = useSelector( state => state.buy );

    useEffect( () => {

        dispatch( loadSelectedInsumos() );
    }, [])

    const handleChange = ( inputValue, actionMeta ) => {

        const value = getPropertysValue( 'value', inputValue ) || '';

        dispatch( setEstablishmentInBuy( value ) );
    }

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
                <fieldset>
                    <CreatableSelect
                        isClearable
                        autoFocus
                        createOptionPosition="first"
                        onChange={handleChange}
                        options={establishmentOptions}
                    />
                    {/* <InputField
                        placeholder="establecimiento"
                        onChange={ ({ target }) => dispatch( setEstablishmentInBuy( target.value ) ) }
                        value={ establishmentName }
                    /> */}
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
