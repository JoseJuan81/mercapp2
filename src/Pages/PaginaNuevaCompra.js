import { isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { loadSelectedInsumos, setEstablishmentInBuy } from '../actions/buyAction';
import { BigAddButton } from '../components/Buttons/BigAddButton';
import { InputField } from '../components/Form/InputField';
import { Insumo } from '../components/Insumos/Insumo';
import { misInsumosPath } from '../constant/routes';

export const PaginaNuevaCompra = () => {

    const dispatch = useDispatch();

    const { selectedInsumos, establishmentName } = useSelector( state => state.buy );

    useEffect( () => {

        dispatch( loadSelectedInsumos() );
    }, [])

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
                    <InputField
                        placeholder="establecimiento"
                        onChange={ ({ target }) => dispatch( setEstablishmentInBuy( target.value ) ) }
                        value={ establishmentName }
                    />
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
