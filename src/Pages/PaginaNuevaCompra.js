import { equality, find, getPropertysValue } from 'functionallibrary';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSelectedInsumos, setEstablishmentInBuy } from '../actions/buyAction';
import { BigAddButton } from '../components/Buttons/BigAddButton';
import { Insumo } from '../components/Insumos/Insumo';
import { misInsumosPath } from '../constant/routes';

import { PageLoading } from './PageLoading';

import { loadEstablishments } from '../actions/establishment';
import { DataList } from '../components/Form/DataList';
import { defaultEstablishment } from '../constant/defaults';

// ===== VARIABLES CONSTANTES =====
const activeBuyRoute = `${ misInsumosPath }?activeBuy=true`;

// ===== COMPONENTES REACT PARA ESTA PAGINA =====
const TotalBuy = React.memo(({ total }) => {
    return (
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
    )
})

// ===== COMPONENTE PRINCIPAL =====
export const PaginaNuevaCompra = () => {

    // ===== STORE =====
    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.loading );
    const { selectedInsumos, establishmentName, total } = useSelector( state => state.buy );
    const establishments = useSelector( state => state.establishments );

    // ===== STATE =====
    const [selectedEstablisment, setSelectedEstablishment] = useState( { ...defaultEstablishment } );
    const [insumosRouteModificated, setInsumosRouteModificated] = useState( activeBuyRoute );
    
    const handleChange = useCallback( ( e ) => {

        const value = getPropertysValue( 'value', e.target ) || '';

        dispatch( setEstablishmentInBuy( value ) );

    },[])

    // cargar establecimientos e insumos seleccionados
    useEffect( () => {

        dispatch( loadEstablishments() );
        dispatch( loadSelectedInsumos() );

    }, []);

    // obtener el objeto establecimiento a partir del nombre del establecimiento
    useEffect( () => {

        const selected = find( equality( 'value', establishmentName.toLowerCase() ), establishments ) || {};

        setSelectedEstablishment( selected )

    }, [establishmentName, establishments])

    // modificar la url en funcion del establecimiento seleccionado
    useEffect( () => {

        let newRoute = activeBuyRoute;

        if ( establishmentName ) {
            newRoute += `&establishment=${ establishmentName }`;
        }

        setInsumosRouteModificated( newRoute );

    },[establishmentName])

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
                    <DataList
                        autoFocus
                        placeholder="seleccione..."
                        onChange={ handleChange }
                        options={ establishments }
                        value={ selectedEstablisment }
                    />

                    <TotalBuy total={ total }/>
                </fieldset>
            </form>

            {selectedInsumos.map(( insumo, ind ) => (
                <Insumo
                    key={ `${ insumo.id } - ${ ind }` }
                    insumo={ insumo }
                    establishment={ establishmentName }
                />
            ))}

            <BigAddButton
                to={ insumosRouteModificated }
                title="Agregrar insumos"
            />

        </div>
    )
}
