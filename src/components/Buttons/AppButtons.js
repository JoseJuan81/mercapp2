import React from 'react';
import { NavLink } from 'react-router-dom';

const ByButton = React.memo( ({ children, onClick, className }) => {

    const localClass = className ? `btn-icon ${ className }` : 'btn-icon';

    return (
        <button
            className={ localClass }
            title="Deseleccionar todo"
            onClick={ onClick }
        >
            { children }
        </button>
    )
})

const ByLink = React.memo( ({ children, to, className }) => {

    const localClass = className ? `${ className } btn-icon` : 'btn-icon';

    return (
        <NavLink
            to={ to }
            className={`
                ${ localClass }
                flex items-center justify-center
            `}
        >
            {children}
        </NavLink>
    )
})

export const BaseButton = React.memo(({ children, isButton = false, onClick, to, className }) => {
    return (
        <>
            {isButton
                ? <ByButton onClick={ onClick } className={ className }>
                    { children }
                </ByButton>
                : <ByLink to={ to } className={ className }>
                    { children }
                </ByLink>
            }
        </>
    )
})

export const AddCircleButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-plus-circle"></i>
        </BaseButton>
    )
})

export const AddButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-plus"></i>
        </BaseButton>
    )
})

export const MinusButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-minus"></i>
        </BaseButton>
    )
})

export const CheckBoxSelected = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-check-square"></i>
        </BaseButton>
    )
})
export const CheckBox = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="far fa-square"></i>
        </BaseButton>
    )
})
export const CheckButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-check"></i>
        </BaseButton>
    )
})

export const CloseCircleButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="far fa-times-circle"></i>
        </BaseButton>
    )
})

export const BackButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-chevron-left"></i>
        </BaseButton>
    )
})

export const BasketButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-shopping-basket"></i>
        </BaseButton>
    )
})

export const LeftCircleButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-chevron-circle-left"></i>
        </BaseButton>
    )
})

export const EditButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="far fa-edit"></i>
        </BaseButton>
    )
})

export const TrashButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="far fa-trash-alt"></i>
        </BaseButton>
    )
})

export const RefreshButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-sync"></i>
        </BaseButton>
    )
})

export const CloseButton = React.memo(({ isButton, to, onClick, className }) => {
    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-times"></i>
        </BaseButton>
    )
});

export const LogoutButton = React.memo(({ isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-sign-out-alt'
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
        </BaseButton>
    )
})
