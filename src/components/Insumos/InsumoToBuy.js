import { isEmpty } from 'functionallibrary';
import React from 'react';
import { useDispatch } from 'react-redux';

import { updateInsumoPriceOnBuying } from '../../actions/newPurchaseAction';

import { InsumoEtiquetas } from './InsumoEtiquetas';
import { InsumoTitle } from './InsumoTitle';
import { InsumoPrice } from './InsumoPrice';
import { InsumoTotal } from './InsumoTotal';
import { InsumoQuantity } from './InsumoQuantity';
import { InsumoToBuyActions } from './InsumoActions';
import { InsumoPriceInfo } from './InsumoPriceInfo';

import { NotificationInfo } from '../../helper/toast';

import { type } from '../../constant/type';

export const InsumoToBuy = React.memo( ({ insumo, establishment }) => {

    // ===== STORE =====
    const dispatch = useDispatch();

    // ===== VARIABLES LOCALES =====
    const { currency, labels, id, name: title, price: priceObject, quantity, total:totalInsumo } = insumo;
    const price = (priceObject && priceObject[establishment.toLowerCase()]) || 0;
    const total = totalInsumo || price;

    // ===== FUNCIONES LOCALES =====
    const onChangePrice = ( e ) => {
        
        if ( establishment ) {
            
            const { value } = e.target;
            dispatch( updateInsumoPriceOnBuying({ id: insumo.id, newPrice: value }) );
        } else {
            NotificationInfo( type.notificationMessages.newPurchaseNoEstablishmentError );
        }

    }

    const onBlur = () => {
        if( isEmpty( price )) {
            onChangePrice({ target: { value: 0 }})    
        }
    }

    return (
        <div
            className={`
                w-full
                duration-200
                rounded-lg
                border border-solid border-warmGray-300
            `}
        >

            <div className="flex px-2 py-3 overflow-hidden relative">

                <div className="flex flex-auto">
                    <InsumoTitle
                        title={ title }
                        css={`
                            duration-200
                            text-xl font-medium text-warmGray-800
                            mx-2 my-3
                        `}
                    />
                </div>

                <InsumoToBuyActions id={ id } />

            </div>

            <div
                className="
                    flex justify-between items-center
                    pr-4 py-1
                    h-12
                "
            >

                <InsumoPrice
                    currency={ currency }
                    price={ price }
                    onChange={ onChangePrice }
                    onBlur={ onBlur }
                    id={ id }
                />

                <InsumoQuantity
                    price={ price }
                    id={ id }
                    quantity={ quantity }
                />

                <InsumoTotal
                    currency={ currency }
                    total={ total }
                />

            </div>

            {labels && labels.length > 0 &&
                <div
                    className={`
                        bg-warmGray-100
                        p-1
                    `}
                >
                    <InsumoEtiquetas labels={ labels } />
                </div>
            }

            {/* Precios por establecimiento */}
            <InsumoPriceInfo prices={ priceObject } />
            
        </div>
    )
})

