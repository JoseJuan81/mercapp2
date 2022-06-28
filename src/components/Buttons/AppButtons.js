import React from 'react';
import { NavLink } from 'react-router-dom';

const ByButton = React.memo( ({ children, onClick, className, disabled }) => {

    let localClass = className ? `btn-icon ${ className }` : 'btn-icon';
    localClass = disabled ? `${ localClass } opacity-25 cursor-not-allowed` : localClass;


    return (
        <button
            disabled={ disabled }
            className={ localClass }
            onClick={ onClick }
        >
            { children }
        </button>
    )
})

const ByLink = React.memo( ({ children, to, className, disabled }) => {

    let localClass = className ? `btn-icon ${ className }` : 'btn-icon';
    localClass = disabled ? `${ localClass } opacity-25 cursor-not-allowed` : localClass;

    return (
        <NavLink
            disabled={ disabled }
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

export const BaseButton = React.memo(({ children, isButton = false, onClick, to, className, disabled = false }) => {
    return (
        <>
            {isButton
                ? <ByButton onClick={ onClick } className={ className } disabled={ disabled }>
                    { children }
                </ByButton>
                : <ByLink to={ to } className={ className } disabled={ disabled }>
                    { children }
                </ByLink>
            }
        </>
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

export const AddCircleButton = React.memo(({ isButton, to, onClick, className, disabled }) => {
    return (
        <BaseButton
            disabled={ disabled }
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className="fas fa-plus-circle"></i>
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

export const CheckButton = React.memo(({ isButton, to, onClick, className, text }) => {
    
    const icon = 'fas fa-check';
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

export const CheckCircleButton = React.memo(({ isButton, to, onClick, className, text }) => {

    const icon = 'far fa-check-circle';
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

export const CheckFullFilledCircleButton = React.memo(({ isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-check-circle';
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

export const LeftButton = React.memo(({ isButton, to, onClick, className }) => {
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

export const FilterButton = React.memo(({ isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-filter';
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

export const SearchButton = React.memo(({ isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-search';
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

export const SeeDetailsButton = React.memo(({ isButton, to, onClick, className, text, disabled }) => {

    const icon = 'far fa-eye';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={ disabled }
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

export const MergeButton = React.memo(({ isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-code-branch';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={ disabled }
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

export const ShoppingCarButton = React.memo(({ children, isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-shopping-cart';
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
            { children }
        </BaseButton>
    )
})

export const ShoppingCarPlusButton = React.memo(({ children, isButton, to, onClick, className, text }) => {

    const icon = 'fa fa-cart-plus';
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
            { children }
        </BaseButton>
    )
})

export const InfoButton = React.memo(({ children, isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-info';
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
            { children }
        </BaseButton>
    )
})

export const MoneyHandButton = React.memo(({ children, isButton, to, onClick, className, text }) => {

    const icon = 'fas fa-hand-holding-usd';
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
            { children }
        </BaseButton>
    )
})

export const PriceStatisticsButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-chart-line';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={ disabled }
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const PigButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-piggy-bank';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const TwoLinesButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-grip-lines';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const GalleryButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-grip-horizontal';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const HeartSolidButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-heart';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const HeartButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'far fa-heart';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const DownButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-chevron-down';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const LockButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-lock';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const LockButtonOpen = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-lock-open';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const ListButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-list';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const ShareButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-share-alt';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const ChartButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-chart-bar';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const CreditCardButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-credit-card';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})

export const StoreButton = React.memo(({ children, isButton, to, onClick, className, text, disabled }) => {

    const icon = 'fas fa-store';
    const buildClasses = text ? `${ icon } mr-2` : icon;

    return (
        <BaseButton
            disabled={disabled}
            className={ className }
            to={ to }
            isButton={ isButton }
            onClick={ onClick }
        >
            <i className={ buildClasses }></i>
            { text }
            { children }
        </BaseButton>
    )
})
