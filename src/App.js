import './App.css';
import React from 'react';
import {useEffect, useState} from 'react';
import {supabase} from './supabase/client.js';
import {FetchProducts} from "./fetchProducts";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBarUser from "./components/NavBarUser";
import Home from "./pages/Home";
import Cart from "./pages/ShoppingCart";
import Profile from "./pages/Profile";
import login from "./pages/login";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import {Container} from "@mui/material";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProductsGrid from './pages/ProductsGrid';
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";

function App() {
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await FetchProducts();
      setFetchedProducts(fetchedData);
    }
    fetchData();
  }, []);

      return (
        <div className="App">
            <ShoppingCartProvider>
                <Router>
                    <NavBarUser/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/grid" element={<ProductsGrid products={fetchedProducts}/>}/>
                        <Route path="/carrito" element={<Cart/>}/>
                        <Route path="/perfil" element={<Profile/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path={"/orders"} element={<PlaceOrder/>}/>
                    </Routes>
                </Router>
            </ShoppingCartProvider>
        </div>

        
    );

}

export default App;