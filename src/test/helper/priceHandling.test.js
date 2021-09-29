import { defaultObjectPrice, priceFromArrayToObject, priceFromObjectToArray } from "../../helper/priceHandling"

describe('Pruebas sobre archivo priceHandling.js', () => {

    test('Retornar objeto por defecto de precio de insumo', () => {

        const result = priceFromObjectToArray();

        expect( result ).toEqual( [defaultObjectPrice] );
    });

    test('Convertir objeto a arreglo', () => {

        const price = { mass: 25, wong: 30 };
        const result = priceFromObjectToArray( price );

        expect( result ).toEqual([
            { name: 'mass', value: 25 },
            { name: 'wong', value: 30 },
        ]);
    });

    test('Convertir arreglo a objeto', () => {

        const price = [
            { name: 'mass', value: 25 },
            { name: 'wong', value: 30 },
        ]
        const result = priceFromArrayToObject( price );

        expect( result ).toEqual({
            mass: 25,
            wong: 30
        });
    })
})