import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetails from '../ProductDetails';
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useLocation } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Importar la extensión de expect

// Mockear el contexto de ShoppingCartContext
jest.mock('../../contexts/ShoppingCartContext', () => ({
  ShoppingCartContext: {
    Consumer: ({ children }) => children({
      addOneProduct: jest.fn() // Puedes agregar más funciones simuladas según tus necesidades
    }),
  },
}));

// Mockear la función useLocation
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

test('renderiza el producto correctamente', () => {
  // Datos del producto simulado
  const product = {
    name: 'Zapato Deportivo',
    id: 3, 
    code: 'C0035D',
    price: 299,
    detail: 'Tallas 35 al 39',
    sizes: ['35', '39'],
    // eslint-disable-next-line no-useless-concat
    imageUrl: process.env.REACT_APP_STORAGE_URL + 'Deportivo1' + ".png",
  };

  // Simular el valor de location.state.product que se obtiene del useLocation
  useLocation.mockReturnValue({ state: { product } });

  // Renderizar el componente con los mocks
  render(<ProductDetails />);

  // Aquí puedes agregar expectativas para asegurarte de que los datos del producto se muestren correctamente en el componente renderizado
  // Por ejemplo:
  const productName = screen.getByText('Zapato Deportivo');
  expect(productName).toBeInTheDocument();

  // Encuentra todos los radio buttons con el valor "39"
  const sizeRadioButtons = screen.getAllByRole('radio', { name: '39', exact: true });

  // Selecciona la talla haciendo clic en el radio button
  userEvent.click(sizeRadioButtons[0]);

  // Asegúrate de que el radio button esté seleccionado
  expect(sizeRadioButtons[0]).toBeChecked();

});
