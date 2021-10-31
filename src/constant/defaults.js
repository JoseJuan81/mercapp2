import { misInsumosPath, nuevaCompraPath, resumenDeComprasPath } from "./routes";

export const DEFAULT_ESTABLISHMENT = { label: '', value: '' };

export const DEFAULT_OBJECT_PRICE = { name: '', value: 0 };

export const MENU_ROUTES = [
    { to: nuevaCompraPath, name: 'Nueva Compra', icon: 'fas fa-cart-plus mr-2' },
    { to: resumenDeComprasPath, name: 'Mis compras', icon: 'fas fa-store mr-2' },
    { to: misInsumosPath, name: 'Mis insumos', icon: 'fas fa-pepper-hot mr-2' },
]