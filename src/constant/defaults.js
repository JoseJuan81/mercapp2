import { listaComprasPath, misInsumosPath, nuevaCompraPath, resumenDeComprasPath } from "./routes";

export const DEFAULT_ESTABLISHMENT = { label: '', value: '' };

export const DEFAULT_OBJECT_PRICE = { name: '', value: 0 };

export const MENU_ROUTES = [
    { to: resumenDeComprasPath, name: 'Compras', icon: 'fas fa-store' },
    { to: listaComprasPath, name: 'Listas de compra', icon: 'fas fa-list-alt' },
    { to: nuevaCompraPath, name: 'Nueva Compra', icon: 'fas fa-cart-plus' },
    { to: misInsumosPath, name: 'Insumos', icon: 'fas fa-pepper-hot' },
];

export const NO_PRICES_INSUMO = 'Sin Precio';