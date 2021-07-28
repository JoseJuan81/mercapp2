import { mount } from 'enzyme';
import { ListadoInsumos } from '../../../components/Insumos/ListadoInsumos';
import { InsumoContext } from '../../../context/Insumo/InsumoContext';

const dataFake = [
    {
        id: '82b4791a4e7cb', title: "Aceite de Oliva", price: 20, currency: "S/.", labels: ["500ml", "Carbonell", "metro", "2 und"]
    },
    {
        id: '972de0224af17', title: "Harina Pan", price: 5.50, currency: "S/.", labels: ["1 Kg", "PAN", "San Felipe", "2 und"]
    },
]

describe('Pruebas sobre archivo ListadoInsumos.js', () => {

    const wrapper = mount(
        <InsumoContext.Provider
            value={{
                insumos: []
            }}
        >
            <ListadoInsumos/>
        </InsumoContext.Provider>
    )

    test('Se debe renderizar correctamente <ListadoInsumos />', () => {

        expect( wrapper ).toMatchSnapshot();

    })

    test('Se debe rernderizar "Debe agregrar insumos :)" cuando insumoState = []', () => {
        const h1 = wrapper.find('h1');
        expect( h1.text().trim() ).toBe( 'Debe agregrar insumos :)' );

    })

    test('Se debe renderizar Insumo cuando insumoState != []', () => {

        const wrapper = mount(
            <InsumoContext.Provider
                value={{
                    insumos: dataFake
                }}
            >
            <ListadoInsumos />
        </InsumoContext.Provider>
        )
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('li.mb-3').length ).toBe( dataFake.length );
    })

    test('Se debe llamar mockHandleClickOnInsumo al hacer click', () => {

        const wrapper = mount(
            <InsumoContext.Provider
                value={{
                    insumos: dataFake
                }}
            >
                <ListadoInsumos/>
            </InsumoContext.Provider>
        )

        const li = wrapper.find('li').at(0);
        li.simulate('click', dataFake[0]);

        // expect( mockHandleClickOnInsumo ).toHaveBeenCalled();
    })
})