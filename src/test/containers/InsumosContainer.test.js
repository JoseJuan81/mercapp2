import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { InsumosContainer } from "../../components/container/InsumosContainer"
import { InsumoContext } from '../../context/InsumoContext';


const selectingAllInsumos = jest.fn();
const unSelectingAllInsumos = jest.fn();
const selectedInsumos = [];
const total = 0;
const toogleCheck = jest.fn();
const updateQuantityInSelectedInsumo = jest.fn();

const fakeInsumo = {
    id: '23f8e315e5b27',
    title: "Aceite de Oliva",
    price: 20,
    currency: "S/.",
    labels: ["500ml", "Carbonell", "metro", "2 und"]
}

describe('Pruebas sobre archivo InsumosContainer.js', () => {

    const wrapper = mount(
        <InsumoContext.Provider
            value={{
                selectingAllInsumos,
                insumos: [fakeInsumo],
                unSelectingAllInsumos,
                selectedInsumos,
                total,
                toogleCheck,
                updateQuantityInSelectedInsumo
            }}
        >

            <InsumosContainer />

        </InsumoContext.Provider>
    );

    test('se debe mostrar correctamente <InsumosContainer />', () => {

        expect( wrapper ).toMatchSnapshot();
    });

    test('Se debe llamar toogleCheck al hacer click en un insumo', () => {

        const firstLi = wrapper.find('li').at(0);

        act( () => {

            firstLi.prop('onClick')(fakeInsumo);

        })
        
        expect( toogleCheck ).toHaveBeenCalled();
    })
})