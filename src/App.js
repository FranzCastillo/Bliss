import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBarUser from "./components/NavBarUser";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/ShoppingCart";
import Profile from "./pages/Profile";
import login from "./pages/login";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import {Container} from "@mui/material";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProductsGrid from './pages/ProductsGrid';

function App() {
    const products = [
        {
          id: 1,
          name: "Producto 1",
          description: "Descripción del Producto 1",
          price: 10.99,
          imageUrl: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          name: "Producto 2",
          description: "Descripción del Producto 2",
          price: 15.99,
          imageUrl: "https://via.placeholder.com/300x200",
        },
        {
          id: 3,
          name: "Producto 3",
          description: "Descripción del Producto 3",
          price: 12.99,
          imageUrl: "https://via.placeholder.com/300x200",
        },
      ];
      
      return (
        <div className="App">
            <ShoppingCartProvider>
                <Router>
                    <NavBarUser/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/productos" element={<Products/>}/>
                        <Route path="/grid" element={<ProductsGrid products={products} />}/>
                        <Route path="/carrito" element={<Cart/>}/>
                        <Route path="/perfil" element={<Profile/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                </Router>
            </ShoppingCartProvider>
        </div>

        
    );

}

export default App;
