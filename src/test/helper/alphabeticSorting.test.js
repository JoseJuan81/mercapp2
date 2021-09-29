import { alphabeticSorting } from "../../helper/alphabeticSorting"

describe('Pruebas sobre funcion alphabeticSorting.js', () => {

    const data = [
        { title: 'zafiro' },
        { title: 'Arbol' }
    ];

    test('debe ordernar por ordern alfabetico', () => {

        const sorted = alphabeticSorting( data, 'title' );

        expect( sorted[0].title ).toBe('Arbol');
        expect( sorted[1].title ).toBe('zafiro');
    })
})