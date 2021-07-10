import { mount } from 'enzyme';
import { Insumo } from '../../../components/Insumos/Insumo';
import { InsumoContext } from '../../../context/InsumoContext';

describe('Pruebas sobre archivo Insumo', () => {

    const INSUMO = {
        id: 1,
        title: 'Insumo de prueba',
        price: 34,
        currency: 'S/.',
        labels: ['etiqueta 1', 'etiqueta 2'],
        checked: false
    }

    const updateQuantityInSelectedInsumo = jest.fn();

    const wrapper = mount(
        <InsumoContext.Provider
            value={{
                updateQuantityInSelectedInsumo,
            }}
        >

            <Insumo
                { ...INSUMO }
            />

        </InsumoContext.Provider>
    )

    const INSUMO2 = {
        ...INSUMO,
        checked: true
    }

    const wrapper2 = mount(
        <InsumoContext.Provider
            value={{
                updateQuantityInSelectedInsumo,
            }}
        >

            <Insumo
                { ...INSUMO2 }
            />

        </InsumoContext.Provider>
    )

    test('Se debe mostrar correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
    })

    test('Se debe renderizar el title correctamente', () => {

        const dt = wrapper.find('dt');

        expect( dt.text().trim() ).toBe(INSUMO.title);

    })

    test('Se deben renderizar los labels correctamente', () => {

        const li = wrapper.find('li');

        expect( li.length ).toEqual(INSUMO.labels.length);
        expect( li.at(0).text().trim() ).toEqual(INSUMO.labels[0]);
        expect( li.at(1).text().trim() ).toEqual(INSUMO.labels[1]);
    })

    test('Se deben mostrar los componentes de cantidad, precio y total', () => {
        
        expect( wrapper2 ).toMatchSnapshot();

        const input = wrapper2.find('input');
        expect( input.prop('value') ).toBe(1);

        const dt = wrapper2.find('dt.text-lg.text-warmGray-400.font-semibold');
        const price = dt.childAt(1);
        expect( price.text().trim() ).toBe( INSUMO2.price.toString() );

        const dtTotal = wrapper2.find('dt.text-2xl.text-lime-500.font-bold');
        const total = dtTotal.childAt(2);
        expect( total.text().trim() ).toBe( INSUMO2.price.toString() );
    })

    test('Presionar boton para aumentar cantidad', () => {

        const addBtn = wrapper2.find( '[data-jest="addQuantity"]' );
        addBtn.simulate('click', { stopPropagation(){} });

        expect( updateQuantityInSelectedInsumo ).toHaveBeenCalled();

        const inputVal = wrapper2.find('input').prop('value');
        expect( inputVal ).toBe(2);
    })

    test('Presionar boton para disminuir cantidad', () => {

        const minusBtn = wrapper2.find( '[data-jest="minusQuantity"]' );
        minusBtn.simulate('click', { stopPropagation(){} });

        expect( updateQuantityInSelectedInsumo ).toHaveBeenCalled();

        const inputVal = wrapper2.find('input').prop('value');
        expect( inputVal ).toBe(1);
    })

    test('Presionar boton para disminuir cantidad 10 veces y el resultado debe ser 1', () => {

        const minusBtn = wrapper2.find( '[data-jest="minusQuantity"]' );
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });
        minusBtn.simulate('click', { stopPropagation(){} });

        expect( updateQuantityInSelectedInsumo ).toHaveBeenCalled();

        const inputVal = wrapper2.find('input').prop('value');
        expect( inputVal ).toBe(1);
    })

    test('Total de cantidad 10 * precio debe ser 340', () => {

        const addBtn = wrapper2.find( '[data-jest="addQuantity"]' );
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });
        addBtn.simulate('click', { stopPropagation(){} });

        expect( updateQuantityInSelectedInsumo ).toHaveBeenCalled();

        const inputVal = wrapper2.find('input').prop('value');
        expect( inputVal ).toBe(10);

        const totalDt = wrapper2.find('dt.text-2xl.text-lime-500.font-bold');
        const total = totalDt.childAt(2);
        expect( total.text().trim() ).toBe( String(INSUMO2.price * 10) );
    })
})