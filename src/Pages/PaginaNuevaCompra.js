import { getPropertysValue, isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSelectedInsumos, setEstablishmentInBuy } from '../actions/buyAction';
import { BigAddButton } from '../components/Buttons/BigAddButton';
import { Insumo } from '../components/Insumos/Insumo';
import { misInsumosPath } from '../constant/routes';

import CreatableSelect from 'react-select/creatable';
import { PageLoading } from './PageLoading';

const establishmentOptions = [
    { value: 'wong', label: 'Wong' },
    { value: 'mass', label: 'Mass' },
    { value: 'bodega frente', label: 'Bodega frente' },
    { value: 'metro', label: 'Metro' },
]

export const PaginaNuevaCompra = () => {

    const dispatch = useDispatch();

    const { selectedInsumos, establishmentName, total } = useSelector( state => state.buy );
    const { loading } = useSelector( state => state.loading );

    const handleChange = ( inputValue, actionMeta ) => {

        const value = getPropertysValue( 'value', inputValue ) || '';

        dispatch( setEstablishmentInBuy( value ) );
    }

    useEffect( () => {

        dispatch( loadSelectedInsumos() );

    }, []);

    if ( loading ) {
        return <PageLoading />
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
                <fieldset className="flex items-center justify-between">
                    <CreatableSelect
                        isClearable
                        autoFocus
                        className="flex-1"
                        createOptionPosition="first"
                        onChange={handleChange}
                        options={establishmentOptions}
                        value={ establishmentName }
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
