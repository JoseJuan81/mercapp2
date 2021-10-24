import React from 'react'
import { NavLink } from 'react-router-dom'

const ByButton = React.memo( ({ onClick }) => {
    return (
        <button
            className="btn-icon"
            title="Deseleccionar todo"
            onClick={ onClick }
        >
            <i className="fas fa-plus-circle"></i>
        </button>
    )
})

const ByLink = React.memo( ({ to }) => {
    return (
        <NavLink
            to={ to }
            className="
                btn-icon
                flex items-center justify-center
            "
        >
            <i className="fas fa-plus-circle"></i>
        </NavLink>
    )
})
export const AddCircleButton = ({ isButton = false, onClick, to }) => {
    return (
        <>
            {isButton
                ? <ByButton onClick={ onClick } />
                : <ByLink to={ to } />
            }
        </>
    )
}
