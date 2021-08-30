import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BigAddButton = ({ to, title }) => {
    return (
        <NavLink
            className="
                flex flex-col items-center
                icon-plus
                text-6xl text-warmGray-600
                p-6 pb-3
                border border-solid border-warmGray-600 rounded
            "
            to={ to }
        >
            <p
                className="
                    text-base
                    mt-4
                "
            >
                { title }
            </p>
        </NavLink>
    )
}

BigAddButton.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string
}
