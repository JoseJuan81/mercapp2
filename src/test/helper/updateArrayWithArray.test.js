import { updateArrayWithArray } from "../../helper/updateArrayWithArray";

describe('Pruebas sobre archivo updateArrayWithArray.js', () => {

    const baseArray = [
        { id: 1, name: 'Hola Mundo' }
    ];

    test('Agregar elemento nuevo cuando no existe en arreglo a actualizar', () => {

        const updatedArray = [
            { id: 2, name: 'nuevo elemento' }
        ];

        const result = updateArrayWithArray( baseArray, updatedArray );

        expect( result ).toEqual([
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'nuevo elemento' }
        ])
    })

    test('Actualizar elementos del arreglo base con arreglo actulizado', () => {

        const updatedArray = [
            { id: 2, name: 'nuevo elemento actualizado' }
        ];

        const result = updateArrayWithArray( baseArray, updatedArray );

        expect( result ).toEqual([
            { id: 1, name: 'Hola Mundo' },
            { id: 2, name: 'nuevo elemento actualizado' }
        ])
    })

    test('Sustituir elementos del arreglo base con arreglo actualizado', () => {

        baseArray.push(
            { id: 3, name: 'Nuevo elemento base' }
        )

        const updatedArray = [
            { id: 2, name: 'nuevo elemento actualizado' },
            { id: 3, name: 'nuevo elemento actualizado' },
        ];

        const result = updateArrayWithArray( baseArray, updatedArray );

        expect( result ).toEqual([
            { id: 1, name: 'Hola Mundo' },
            { id: 3, name: 'nuevo elemento actualizado' },
            { id: 2, name: 'nuevo elemento actualizado' },
        ])
    })
})