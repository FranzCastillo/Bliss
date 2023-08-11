import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login';
import { act } from 'react-dom/test-utils';

// Mock de useNavigate
const mockNavigate = jest.fn();
const mockLocation = { pathname: '/login' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));


test('iniciar sesión con credenciales válidas', async () => {
    render(<Login />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button');

    await act(async () => {
        await userEvent.type(emailInput, 'montoyaw1@gmail.com');
        await userEvent.type(passwordInput, '123456');
        await fireEvent.click(submitButton);
    })

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
    })
});

test('iniciar sesión con credenciales no válidas', async () => {
    render(<Login />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button');

    await act(async () => {
        await userEvent.type(emailInput, 'example@test.com');
        await userEvent.type(passwordInput, '123456');
        await fireEvent.click(submitButton);
    })

    await waitFor(() => {
        expect(mockLocation.pathname).toBe('/login');
    })

});



