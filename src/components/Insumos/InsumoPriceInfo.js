import { isEmpty } from 'functionallibrary';
import React from 'react';
import { useSelector } from 'react-redux';
import { priceFromObjectToArray } from '../../helper/priceHandling';

const PriceByEstablishment = ({ establishmentName, price, currency, index }) => {
    return (
        <div
            className={`
                flex items-center justify-between
                w-full
                ${ index === 0 ? 'border-t' : '' }
                border-b border-warmGray-200 border-solid
                py-3 px-4
                text-2xl font-bold
            `}
        >
            <h3
                className="
                    px-3
                    text-lime-500
                    rounded-lg
                "
            >{ establishmentName }</h3>
            <div
                className="
                    flex items-end justify-between
                    px-3 py-2
                    bg-warmGray-100
                    text-warmGray-800
                    rounded-lg
                "
            >
                <span
                    className="
                        text-sm
                    "
                >{ currency }</span>
                <span>{ price }</span>
            </div>
        </div>
    )
}

export const InsumoPriceInfo = () => {

    // ===== STORE =====
    const { prices } = useSelector( store => store.insumoDetails );

    // ===== VARIABLES LOCALES =====
    const pricesArray = priceFromObjectToArray( prices );
    const pricesOrdered = pricesArray.sort((a,b) => a.value - b.value);

    return (
        <div
            className="
                w-full
                pt-4
            "
        >
            <h1
                className="
                    font-bold text-3xl text-warmGray-500
                    mb-6
                "
            >
                Precios por Establecimiento
            </h1>

            {!isEmpty( prices ) && pricesArray.length > 0
                ? pricesOrdered.map((priceObj, ind) => (
                    <PriceByEstablishment
                        index={ ind }
                        key={ `${ priceObj.name}-${ ind }`}
                        currency="S/."
                        price={ priceObj.value }
                        establishmentName={ priceObj.name }
                    />
                ))
                : (<h1>Este producto no tiene precios definidos</h1>)
            }
        </div>
    )
}
