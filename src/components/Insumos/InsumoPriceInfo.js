import { isEmpty } from 'functionallibrary';
import React from 'react';

import { priceFromObjectToArray } from '../../helper/priceHandling';

const PriceByEstablishment = ({ establishmentName, price, currency, index }) => {
    return (
        <div
            className={`
                flex flex-col items-start justify-start
                m-1
                text-xs
            `}
        >
            <h3
                className="
                    bg-lime-100
                    text-lime-500
                    px-1
                    rounded
                "
            >{ establishmentName }</h3>
            <div
                className="
                    flex items-end justify-between
                    text-warmGray-500
                    ml-1
                "
            >
                <span
                    className="
                        text-xs
                    "
                >{ currency }</span>
                <span>{ price }</span>
            </div>
        </div>
    )
}

export const InsumoPriceInfo = ({ prices }) => {

    // ===== VARIABLES LOCALES =====
    const pricesArray = priceFromObjectToArray( prices );
    const pricesOrdered = pricesArray.sort((a,b) => a.value - b.value);

    return (
        <div
            className="
                w-full
                flex flex-wrap
                space-x-1
            "
        >

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
