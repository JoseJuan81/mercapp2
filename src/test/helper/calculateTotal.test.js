import { calculateTotal } from "../../helper/calculateTotal";

describe('pruebas sobre archivo calculateTotal.js', () => {

    test('Debe sumar el producto de price * quantity de cada elemento del areglo', () => {

        const name = 'mass';
        const fk = [
            { price: { [name]: 20 }, quantity: 2 },
            { price: { [name]: 10 }, quantity: 1 },
            { price: { [name]: 1 }, quantity: 5 },
        ];
        const totalExpected = 40 + 10 + 5;

        const total = calculateTotal( fk, name );

        expect( total ).toBe( totalExpected );

    })
})