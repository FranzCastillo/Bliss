import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetails from '../pages/ProductDetails';
import { useLocation } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

jest.mock('../contexts/ShoppingCartContext', () => ({
  ShoppingCartContext: {
    Consumer: ({ children }) => children({
      addOneProduct: jest.fn() 
    }),
  },
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

test('renderiza el producto correctamente', async () => {
  const product = {
    name: 'Zapato Deportivo',
    id: 3, 
    code: 'C0035D',
    price: 299,
    detail: 'Tallas 35 al 39',
    sizes: ['35', '39'],
    imageUrl: process.env.REACT_APP_STORAGE_URL + 'Deportivo1' + ".png",
  };

  useLocation.mockReturnValue({ state: { product } });

  render(<ProductDetails />);

  const productName = screen.getByText('Zapato Deportivo');
  expect(productName).toBeInTheDocument();

  const sizeRadioButtons = screen.getAllByRole('radio', { name: '39', exact: true });

  await act(async () => {
    userEvent.click(sizeRadioButtons[0]);
  })

  expect(sizeRadioButtons[0]).toBeChecked();

});
