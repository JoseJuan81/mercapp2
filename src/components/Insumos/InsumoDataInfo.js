import { isEmpty } from 'functionallibrary'
import React from 'react'
import { InsumoEtiquetas } from './InsumoEtiquetas'

export const InsumoDataInfo = ({ data }) => {

    return (
        <div>
            <h1
                className="
                    text-3xl font-bold
                "
            >
                { data.name }
            </h1>

            {!isEmpty( data.labels ) && data.labels.length > 0 &&
                <InsumoEtiquetas
                    labels={ data.labels }
                />
            }

        </div>
    )
}
