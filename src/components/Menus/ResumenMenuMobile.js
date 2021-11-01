import React from 'react';
import { useSelector } from 'react-redux';

import { nuevaCompraPath } from '../../constant/routes';
import { AddCircleButton, FilterButton, MergeButton, SeeDetailsButton } from '../Buttons/AppButtons';

export const ResumenMenuMobile = () => {

    // ===== STORE =====
    const { selected } = useSelector( state => state.purchases );

    // ===== VARIABLES LOCALES =====
    const len = selected.length;
    const isNotMergeable = len < 2;
    const isDetails = len !== 1;

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-4
            "
        >

            <FilterButton
                isButton
            />

            <MergeButton
                isButton
                disabled={ isNotMergeable }
            />

            <SeeDetailsButton
                isButton
                disabled={ isDetails }
            />

            <AddCircleButton
                to={ nuevaCompraPath }
                className="
                    flex items-center justify-center
                "
            />

        </div>
    )
}
