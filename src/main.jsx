import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ShoppingCartProvider from "./contexts/ShoppingCartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ShoppingCartProvider>
                <App/>
            </ShoppingCartProvider>
        </BrowserRouter>
    </React.StrictMode>
);