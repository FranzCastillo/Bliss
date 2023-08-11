import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import OrderDetails from '../pages/Orders/Details/OrderDetails.jsx';
import {describe, test, expect} from 'vitest'
import {BrowserRouter, Routes} from "react-router-dom";
import { MemoryRouter, Route } from 'react-router-dom';
import {supabase} from "../supabase/client.js";


describe('OrderDetails', () => {
    test('Muestra mensaje de carga mientras no haya datos', () => {
        render(
            <BrowserRouter>
                <OrderDetails />
            </BrowserRouter>
        )
        const loadingMessage = screen.getByText(/LOADING/i);
        expect(loadingMessage).toBeInTheDocument();
    });

    // test('renders order details after fetching order', async () => {
    //     const orderID = '123'; // Replace with the desired order ID
    //
    //     render(
    //         <MemoryRouter initialEntries={[`/detalles-orden/${orderID}`]}>
    //             <OrderDetails/>
    //         </MemoryRouter>
    //     );
    //
    //     // Wait for the component to render and resolve the data fetching
    //     await waitFor(() => {
    //         expect(screen.getByText(`Detalles del pedido #${orderID}`)).toBeInTheDocument();
    //     });
    // });
});
