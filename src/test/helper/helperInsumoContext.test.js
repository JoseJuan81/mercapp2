import { round } from 'functionallibrary';
import fakeData from '../../fakeData/insumos';
import {
    onFilter,
    onSearch,
    updateItemInArrayById,
    selectAllInsumos,
    unSelectAllInsumos,
    updateTotal,
    updatingQuantity,
} from '../../helper/helperInsumoContext';

const twoDecimals = round(2);

describe('pruebas sobre archivo helperInsumoContext.js', () => {

    const [first, second] = fakeData;

    test('Calcular el total de los insumos seleccionados con la funcion updateTotal', () => {

        const firstTotal = twoDecimals( first.quantity * first.price );
        const secondTotal = twoDecimals( second.quantity * second.price );
        expect( updateTotal( [first, second] ) ).toBe( firstTotal + secondTotal );
    })

    test('Retornar cero si no hay insumos seleccionados', () => {
        const selectedInsumos = [];
        expect( updateTotal( selectedInsumos ) ).toBe( 0 );
    })

    test('Calcular el total de los insumos seleccionados cuando se modifica la cantidad', () => {

        const updatedInsumos = updatingQuantity(first.id, 10, [first, second]);
        expect( updatedInsumos[0].quantity ).toBe( 10 );
    })

    test('Seleccionar todos los insumos ( checked = true ) con selectAllInsumos()' , () => {
        
        expect( !!first.checked ).toBe( false );
        expect( !!second.checked ).toBe( false );

        const allSelected = selectAllInsumos([first, second]);
        expect( allSelected[0].checked ).toBe(true);
        expect( allSelected[1].checked ).toBe(true);
    })

    test('Deseleccionar todos los insumos con unSelecteAllInsumos()', () => {
        const allSelected = selectAllInsumos([first, second]);
        expect( allSelected[0].checked ).toBe(true);
        expect( allSelected[1].checked ).toBe(true);

        const allUnSelected = unSelectAllInsumos(allSelected);
        expect( allUnSelected[0].checked ).toBe( false );
        expect( allUnSelected[1].checked ).toBe( false );
    })

    test('Seleccionar un insumo y actualizar arreglo de insumos', () => {

        const updated = updateItemInArrayById([first, second], { ...second, checked: true });
        expect( updated[0].checked ).toBe( undefined );
        expect( updated[1].checked ).toBe( true );
    })

    test('Buscar Insumo con onSearch()', () => {
        const search = 'eite';

        const searchedInsumo = onSearch([first, second], search);
        expect(searchedInsumo[0].title).toBe( first.title );
    })

    test('Buscar insumo por labels', () => {
        const val = 'pan';
        const searchedInsumo = onFilter(fakeData, val);

        expect(searchedInsumo[0].title).toBe( second.title );
    })

})
