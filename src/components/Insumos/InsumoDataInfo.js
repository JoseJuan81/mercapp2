import { isEmpty } from 'functionallibrary';
import React from 'react';

import { priceFromObjectToArray } from '../../helper/priceHandling';

import { InsumoEtiquetas } from './InsumoEtiquetas'

export const InsumoDataInfo = ({ data, prices }) => {

    // ===== VARIABLES LOCALES =====
    const pricesArray = priceFromObjectToArray( prices );
    const pricesOrdered = pricesArray.sort((a,b) => a.value - b.value);

    return (
        <div className="w-full">
            <h1
                className="
                    text-3xl font-bold text-center
                    mb-2
                "
            >
                { data.name }
            </h1>

            {!isEmpty( data.labels ) && data.labels.length > 0 &&
                <div
                    className="
                        mb-4
                        bg-warmGray-100
                        py-2 px-2
                    "
                >
                    <InsumoEtiquetas
                        labels={ data.labels }
                    />
                </div>
            }

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

const PriceByEstablishment = ({ establishmentName, price, currency, index }) => {
    return (
        <div
            className={`
                grid grid-cols-2 items-center
                w-full
                ${ index === 0 ? 'border-t' : '' }
                ${ index === 0 ? 'bg-lime-50' : 'bg-white' }
                border-b border-warmGray-200 border-solid
                font-bold
                `}
                >
            <h3
                className={`
                    px-3
                    ${ index === 0 ? 'text-lime-500' : 'text-warmGray-500' }
                    `}
                    >
                { establishmentName }
            </h3>
            <div
                className={`
                    ${ index === 0 ? 'text-lime-500' : 'text-warmGray-800' }
                    ${ index === 0 ? 'bg-lime-100' : 'bg-warmGray-100' }
                    flex items-baseline justify-end
                    px-3 py-2
                `}
            >
                <span
                    className="
                        text-sm
                        mr-2
                    "
                >{ currency }</span>
                <span>{ price }</span>
            </div>
        </div>
    )
}
