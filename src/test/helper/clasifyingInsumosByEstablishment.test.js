import { round } from "functionallibrary";
import { addIntoAcc, ascendingOrder, clasifyingInsumosByEstablishment, convertIntoArray } from "../../helper/clasifyingInsumosByEstablishment";

const TWODECIMALS = round( 2 );

describe('Pruebas sobre archivo clasifyingInsumosByEstablishment.js', () => {

    const plaza = { name: 'Plaza vea', price: 25 };
    const wong = { name: 'wong', price: 30 };

    let acc = {};
    
    const item1 = {
        price: {
            'Plaza vea': 25,
            'wong': 30
        }
    }

    const insumos = [
        {
            createdAt: "2021-11-18T16:08:43.664Z",
            id: "61967a8b1b54eaced2d15f8f",
            labels: ["500 ml", "Plaza vea", "Carbonel"],
            name: "Aceite de oliva",
            price: {'plaza vea': 22.9},
            selected: true,
            updatedAt: "2021-11-18T16:08:43.664Z",
            user: "6162ef3fdd1908fe718d821c",
        },
        {
            createdAt: "2021-10-30T00:35:05.079Z",
            id: "617c9339a67466c237c77432",
            labels: ["20 l", "caja", "san luis", "wong"],
            name: "Agua",
            price: {wong: 23.5},
            updatedAt: "2021-11-07T14:51:56.195Z",
            user: "6162ef3fdd1908fe718d821c",
        },
        {
            createdAt: "2021-10-30T00:32:12.292Z",
            id: "617c928ca67466c237c77429",
            labels: ["Bodega frente", "100 g", "laive", "wong"],
            name: "Mantequilla",
            price: {wong: 4.99, 'bodega frente': 5},
            updatedAt: "2021-11-19T19:27:39.546Z",
            user: "6162ef3fdd1908fe718d821c"
        },
        {
            createdAt: "2021-11-19T18:20:22.866Z",
            id: "6197eae615ede152dace8c3e",
            labels: ["750 g", "Bodega frente", "Faraón"],
            name: "Arroz faraón",
            price: {'bodega frente': 3.8},
            updatedAt: "2021-11-19T18:20:22.866Z",
            user: "6162ef3fdd1908fe718d821c"
        },
        {
            createdAt: "2021-10-30T00:35:55.636Z",
            id: "617c936ba67466c237c77435",
            labels: ["bodega frente", "3 unidades", "wong"],
            name: "Bombones Ferrero",
            price: {wong: 9.99, 'bodega frente': 7},
            updatedAt: "2021-11-07T14:36:14.715Z",
            user: "6162ef3fdd1908fe718d821c"
        },
        {
            createdAt: "2021-10-31T01:34:35.571Z",
            id: "617df2ab98858415166767f3",
            labels: ["bodega frente", "wong", "85 g", "kraft", "plaza vea"],
            name: "Queso Parmesano",
            price: {'plaza vea': 11.9, wong: 10.9, 'bodega frente': 7.8},
            updatedAt: "2021-11-16T03:22:40.645Z",
            user: "6162ef3fdd1908fe718d821c"
        },
    ]

    const noPriceInsumo = {
        createdAt: "2021-10-31T01:34:35.571Z",
        id: "617df2ab98858415166767f3",
        labels: ["bodega frente", "wong", "85 g", "kraft", "plaza vea"],
        name: "Queso Mozzarela",
        price: {},
        updatedAt: "2021-11-16T03:22:40.645Z",
        user: "6162ef3fdd1908fe718d821c"
    }

    it('Debe convertir en arreglo de objetos los precios ( convertIntoArray() )', () => {
        

        const result = convertIntoArray( item1.price )(['Plaza vea', 'wong']);
        expect( result ).toEqual([
            plaza,
            wong
        ])
    })

    it('Ordenar de menor a mayor por precio ascendingOrder()', () => {

        const result = ascendingOrder([wong, plaza]);
        expect( result ).toEqual([plaza, wong]);
    })

    it('Agregar un Elemento al acumulador vacio del reduce ( addIntoAcc() )', () => {

        acc = addIntoAcc( acc, item1, plaza );

        expect( acc ).toEqual({
            'Plaza vea': {
                name: plaza.name,
                insumos: [item1],
                total: plaza.price
            }
        })
    })

    it('Agregar un Elemento al acumulador del reduce ( addIntoAcc() )', () => {

        acc = addIntoAcc( acc, item1, wong );

        expect( acc ).toEqual({
            'Plaza vea': {
                name: plaza.name,
                insumos: [item1],
                total: plaza.price
            },
            'wong': {
                name: wong.name,
                insumos: [item1],
                total: wong.price
            }
        })
    })

    it('Agregar un Elemento al acumulador y sumar el total', () => {

        acc = addIntoAcc( acc, item1, plaza );

        expect( acc ).toEqual({
            'Plaza vea': {
                name: plaza.name,
                insumos: [item1, item1],
                total: plaza.price + plaza.price
            },
            'wong': {
                name: wong.name,
                insumos: [item1],
                total: wong.price
            }
        })
    })

    it('pruebas en clasifyingInsumosByEstablishment.js :: Un insumo sin precio', () => {

        const result = clasifyingInsumosByEstablishment( [...insumos, noPriceInsumo] );

        expect( result ).toEqual([
            {
                name: 'bodega frente',
                insumos: [insumos[3], insumos[4], insumos[5]],
                total: insumos[3].price['bodega frente'] + insumos[4].price['bodega frente'] + insumos[5].price['bodega frente']
            },
            {
                name: 'plaza vea',
                insumos: [insumos[0]],
                total: insumos[0].price['plaza vea']
            },
            {
                name: 'Sin Precio',
                insumos: [{ ...noPriceInsumo, price: { 'Sin Precio': 0 } }],
                total: 0
            },
            {
                name: 'wong',
                insumos: [insumos[1], insumos[2]],
                total: TWODECIMALS( insumos[1].price['wong'] + insumos[2].price['wong'] )
            },
        ])
    })

    it('pruebas en clasifyingInsumosByEstablishment.js :: Todos los insumos tienen precio', () => {

        const result = clasifyingInsumosByEstablishment( insumos );

        expect( result ).toEqual([
            {
                name: 'bodega frente',
                insumos: [insumos[3], insumos[4], insumos[5]],
                total: insumos[3].price['bodega frente'] + insumos[4].price['bodega frente'] + insumos[5].price['bodega frente']
            },
            {
                name: 'plaza vea',
                insumos: [insumos[0]],
                total: insumos[0].price['plaza vea']
            },
            {
                name: 'wong',
                insumos: [insumos[1], insumos[2]],
                total: TWODECIMALS( insumos[1].price['wong'] + insumos[2].price['wong'] )
            },
        ])
    })
})