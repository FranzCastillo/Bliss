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

function App() {
    return (
        <div className="App">
            <ShoppingCartProvider>
                <Router>
                    <NavBarUser/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/productos" element={<Products/>}/>
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
