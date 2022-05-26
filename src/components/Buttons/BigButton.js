import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BigButton = React.memo( ({ to, title, icon }) => {

    return (
        <NavLink
            data-cy="BigButton"
            className="
                flex flex-col items-center
                text-6xl text-warmGray-600
                p-6 pb-3
                border border-solid border-warmGray-600 rounded
            "
            to={ to }
        >
            <i className={ icon }></i>
            <p
                className="
                    text-base
                    mt-4
                    whitespace-nowrap
                "
            >
                { title }
            </p>
        </NavLink>
    )
})

BigButton.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string
}
